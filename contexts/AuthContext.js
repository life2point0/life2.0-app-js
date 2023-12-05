import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYCLOAK_CLIENT_ID, KEYCLOAK_REALM, KEYCLOAK_URL, USER_SERVICE_BASE_URL } from '../components/constants';
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
  const [chatToken, setChatToken] = useState();
  const { client } = useChatContext();
  const isProfileCreated = !!profile?.description;
  const isImageUploaded = !!profile?.photos.length;

  const getNewToken = async (refreshToken) => {
  
    const data = qs.stringify({
      'grant_type': 'refresh_token',
      'client_id': KEYCLOAK_CLIENT_ID, 
      'refresh_token': refreshToken,
    });

    try {
      const response = await axios.post(TOKEN_URL, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      const { access_token } = response.data;
      setAccessToken(access_token);
      setIsAuthenticated(true)
      return access_token
    } catch (error) {
      setIsAuthenticated(false)
      throw error;
    }
  }

  const authCall = (config) => { // Write axios interceptor instead
    return axios({
      ...config, 
      headers: {
        ...config.headers,
        'Authorization': `Bearer ${accessToken}`
      }
    })
  }

  const getProfile = async () => {
    try {
      const profile = (await authCall({
        method: 'GET',
        url: `${USER_SERVICE_BASE_URL}/users/me`
      }))?.data;
      setProfile(profile);
      return profile;
    } catch (e) {
      console.log(e);
    }
  }

  const getChatToken = async () => {
    if(chatToken) {
      return chatToken
    }
    try {
      const token = (await authCall({
        method: 'GET',
        url: `${USER_SERVICE_BASE_URL}/users/me/tokens`
      }))?.data;
      setChatToken(token);
      return token;
    } catch (e) {
      console.log(e);
    }
  }

  const initChat = async () => {
    if (client?.userID && client.wsConnection?.isHealthy) {
      return;
    }
    try {
      await client.connectUser(
        {
          id: profile?.id,
          name: `${profile?.firstName} ${profile?.lastName}`,
        },
        chatToken.streamChat
      );
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (accessToken) {
      getProfile()
    } else {
      setProfile(null)
    }
  }, [accessToken])
  
  useEffect(() => {
    if (isProfileCreated) {
      getChatToken()
    }
  }, [profile, isProfileCreated])

  useEffect(() => {
    if (chatToken) {
      initChat()
    }
  }, [chatToken])

  useEffect(() => {
    (async () => {
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
      if (storedRefreshToken) {
        setIsAuthenticated(true)
        setRefreshToken(storedRefreshToken);
        try {
          await getNewToken(storedRefreshToken);
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
      await axios.delete(`${USER_SERVICE_BASE_URL}/sessions`, config )
      setIsAuthenticated(false)
      setRefreshToken('')
      setAccessToken('')
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
      if (await getNewToken()) {
        return true;
      }
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ login, logout, refreshToken, isLoggedIn, isAuthenticated, authCall, isProfileCreated, isImageUploaded, getProfile, getChatToken, initChat, profile, chatToken }}>
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
