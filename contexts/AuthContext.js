import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYCLOAK_CLIENT_ID, KEYCLOAK_REALM, KEYCLOAK_URL } from '../components/constants';
import axios from 'axios';
import qs from 'qs';


const AuthContext = createContext();
const TOKEN_URL = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshToken, setRefreshToken] = useState();
  const [accessToken, setAccessToken] = useState();

  const getNewToken = async (refreshToken) => {
  
    const data = qs.stringify({
      'grant_type': 'refresh_token',
      'client_id': KEYCLOAK_CLIENT_ID, 
      'refresh_token': refreshToken,
    });

    try {
      const response = await axiosInstance.post(TOKEN_URL, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      const { access_token } = response.data;
      setAccessToken(access_token)
      return access_token; 
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    (async () => {
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
      if (storedRefreshToken) {
        setRefreshToken(storedRefreshToken);
        try {
          await getNewToken();
        } catch (e) {
          AsyncStorage.removeItem('refreshToken')
        }
        setIsAuthenticated(true);
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
    <AuthContext.Provider value={{ login, logout, refreshToken, isLoggedIn, isAuthenticated }}>
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
