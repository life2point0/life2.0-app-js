import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYCLOAK_REALM, KEYCLOAK_URL, USER_SERVICE_BASE_URL } from '../components/constants';
import axios from 'axios';
import qs from 'qs';
import { useChatContext } from 'stream-chat-expo';



const AuthContext = createContext();
const TOKEN_URL = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshToken, setRefreshToken] = useState();
  const [accessToken, setAccessToken] = useState();
  const [profile, setProfile] = useState(null);
  const { client } = useChatContext();
  const isProfileCreated = !!profile?.description;
  const isImageUploaded = !!profile?.photos.length;
  const isNewUser = !!profile?.skills;

  const getNewToken = async (refreshToken) => {
  
    const data = {
      'refreshToken': refreshToken
    }

    try {
      const response = await axios.post(`${USER_SERVICE_BASE_URL}/sessions/token`, data);
      // console.log('accessToken', response.data);
      const { accessToken } = response.data;
      setAccessToken(accessToken);
      setIsAuthenticated(true)
      return accessToken
    } catch (error) {
      setIsAuthenticated(false)
      throw error;
    }
  }

  const authCall = async (config) => {
    try {
      return axios({
      ...config, 
      headers: {
        ...config.headers,
        'Authorization': `Bearer ${accessToken}`
      }
      })
    } catch(error) {
        if (error.response && error.response.status === 401) {
          try {
            const newAccessToken = await getNewToken(refreshToken);
            const retryConfig = {
              ...config,
              headers: {
                ...config.headers,
                'Authorization': `Bearer ${newAccessToken}`,
              },
            };
            return await axios(retryConfig);
          } catch (refreshError) {
            logout();
            throw refreshError;
          }
        }
        throw error;
      }
  }

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401 && refreshToken) {        try {
          const newAccessToken = await getNewToken(refreshToken);
          const originalRequest = error.config;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return await axios(originalRequest);
        } catch (refreshError) {
          logout()
          throw refreshError
        }
      }
      throw error;
    }
  )


  const getProfile = async () => {
    try {
      const profile = (await authCall({
        method: 'GET',
        url: `${USER_SERVICE_BASE_URL}/users/me`
      }))?.data;
      setProfile(profile);
      return profile;
    } catch (e) {
      logout()
      console.log(e)
    }
  }

  const getChatToken = async () => {
    const token = (await authCall({
      method: 'GET',
      url: `${USER_SERVICE_BASE_URL}/users/me/tokens`
    }))?.data;
    return token.streamChat;
  }

  const initChat = async () => {
    if ((client?.userID && client.wsConnection?.isHealthy) || !profile?.id) {
      return
    }
    if (client?.wsConnection?.isConnecting) {
      return new Promise((resolve, reject) => {
        const { unsubscribe } = client.on('connection.changed', (event) => {
          if (event.online) {
            unsubscribe();
            resolve();
          }
        })
      })
    }
    try {
      await client.connectUser(
        {
          id: profile?.id,
          name: `${profile?.firstName} ${profile?.lastName}`,
        },
        getChatToken
      )
    } catch (e) {
      console.log('INIT chat fail', e);
    }
  }

  useEffect(() => {
    if (accessToken) {
      getProfile()
    }
  }, [accessToken])
  
  useEffect(() => {
    if (isProfileCreated) {
      initChat()
    }
  }, [profile, isProfileCreated])

  useEffect(() => {
    (async () => {
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
      if (storedRefreshToken) {
        setRefreshToken(storedRefreshToken);
        try {
          await getNewToken(storedRefreshToken);
          setIsAuthenticated(true)
        } catch (e) {
          setIsAuthenticated(false)
          AsyncStorage.removeItem('refreshToken')
        }
      }
    })();
  }, []);

  const login = async (username, password) => {
    try {
      const data = {
        'username': username,
        'password': password
      }
      const response = await axios.post(`${USER_SERVICE_BASE_URL}/sessions`, data )
      const { accessToken, refreshToken } = response.data;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      setIsAuthenticated(true);
    } catch (e) {
      await AsyncStorage.removeItem('refreshToken');
      setIsAuthenticated(false);
      console.log(e);
      throw e;
    }
  };

  const logout = async () => {
    const config = {
      data: {
        'refreshToken': refreshToken
      }
    }

    try {
      await axios.delete(`${USER_SERVICE_BASE_URL}/sessions`, config)
      if (client?.wsConnection?.isHealthy) {
        await client.disconnectUser();
        console.log('Disconnected', client.userID, client.wsConnection?.isHealthy);
      }
      setIsAuthenticated(false)
      setRefreshToken('')
      setAccessToken('')
      setProfile(null)
    } catch (e) {
      console.log(e)
      throw e
    }
  }

  const isLoggedIn = async () => {
    if (accessToken) {
      return true;
    }

    const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
      if (await getNewToken(storedRefreshToken)) {
        return true;
      }
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ login, logout, refreshToken, isLoggedIn, isAuthenticated, authCall, isProfileCreated, isImageUploaded, isNewUser, getProfile, getChatToken, initChat, profile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
