import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYCLOAK_CLIENT_ID, KEYCLOAK_REALM, KEYCLOAK_URL, USER_SERVICE_BASE_URL } from '../components/constants';
import axios from 'axios';
import qs from 'qs';
import { CometChat } from '@cometchat-pro/react-native-chat';
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
      logout();
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
      logout();
    }
  }

  const initChat = async () => {
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

  const loginToCometchat = async () => {
    CometChat.login('UID', 'API_KEY').then(
      (user) => {
        console.log('Login Successful', user);
      },
      (error) => {
        console.log('Login failed with exception:', error);
      }
    );
  }

  useEffect(() => {
    if (accessToken) {
      getProfile()
    } else {
      setProfile(null)
    }
  }, [accessToken])
  
  useEffect(() => {
    if (profile) {
        getChatToken()
    }
  }, [profile])

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
          console.log(e?.response?.data)
          AsyncStorage.removeItem('refreshToken')
        }
      }
    })();
  }, []);

  const login = async (username, password) => {
    try {
      const data = qs.stringify({
        'grant_type': 'password',
        'client_id': KEYCLOAK_CLIENT_ID, 
        'username': username,
        'password': password
      })
      const response = await axios.post(TOKEN_URL, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      const { access_token, refresh_token } = response.data;
      console.log(response.data)
      setAccessToken(access_token);
      setRefreshToken(refresh_token);
      await AsyncStorage.setItem('refreshToken', refresh_token);
      setIsAuthenticated(true);
    } catch (e) {
      await AsyncStorage.removeItem('refreshToken');
      setIsAuthenticated(false);
      console.log(e);
      throw e;
    }
  };

  const logout = async () => {
    setIsAuthenticated(false);
    setRefreshToken('');
    setAccessToken('');
    // TODO: call keycloak to invalidate refresh token
  };

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
    <AuthContext.Provider value={{ login, logout, refreshToken, isLoggedIn, isAuthenticated, authCall, isProfileCreated, getProfile, getChatToken, initChat, profile, chatToken }}>
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
