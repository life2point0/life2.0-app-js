import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYCLOAK_REALM, KEYCLOAK_URL, USER_SERVICE_BASE_URL } from '../components/constants';
import axios from 'axios';
import { useChatContext } from 'stream-chat-expo';
import messaging from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import firebase from '@react-native-firebase/app';
import { useNavigation } from '@react-navigation/core';




const AuthContext = createContext();
const TOKEN_URL = `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`;

const firebaseConfig = {
  apiKey: 'AIzaSyCAnfVRlSxFAPczK4oygJhDH_AwKCKJVjk', 
  appId: '1:379679414750:android:3f4b20c107dc018285e54f',
  authDomain: 'your-auth-domain',
  projectId: "life2point0",
  storageBucket: "life2point0.appspot.com",
  messagingSenderId: '379679414750',
  databaseURL: 'https://life2point0.firebaseio.com'
};


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [refreshToken, setRefreshToken] = useState();
  const [accessToken, setAccessToken] = useState();
  const [profile, setProfile] = useState(null);
  const { client, setActiveChannel } = useChatContext();
  const isProfileCreated = !!profile?.description;
  const isImageUploaded = !!profile?.photos.length;
  const [isFCMReady, setIsFCMReady] = useState(false);
  const unsubscribeTokenRefreshListenerRef = useRef();
  const { navigate } = useNavigation();

  const getNewToken = async (refreshToken) => {
  
    const data = {
      'refreshToken': refreshToken
    }

    try {
      const response = await axios.post(`${USER_SERVICE_BASE_URL}/sessions/token`, data);
      console.log('accessToken', response.data);
      const { accessToken } = response.data;
      setAccessToken(accessToken);
      setIsAuthenticated(true)
      return accessToken
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

  const requestNotificationPermission = async () => {
    console.log('Requesting permission...');

    // Requests permission to show notifications
    const { status } = await Notifications.requestPermissionsAsync();

    // Checking if we have permission
    if (status === 'granted') {
        console.log('Notification permissions granted.');
    } else {
        console.log('Notification permissions denied.');
    }
  };

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

  const registerPushToken = async () => {
    if (firebase.apps.length === 0) {
      await firebase.initializeApp(firebaseConfig)
      console.log({apps: firebase.apps})
    }
    unsubscribeTokenRefreshListenerRef.current?.();
    const token = await messaging().getToken();
    await client.addDevice(token, 'firebase', profile?.id, 'life2point0-android');

    unsubscribeTokenRefreshListenerRef.current = messaging().onTokenRefresh(async newToken => {
      await client.addDevice(newToken, 'firebase');
    });
  };
  
  useEffect(() => {
    if (isProfileCreated) {
      const init = async () => {
        await initChat()
        await requestNotificationPermission();
        await registerPushToken();
        setIsFCMReady(true);
        messaging().onNotificationOpenedApp(async (remoteMessage) => {
          console.log('Notification caused app to open from background state:', remoteMessage);
          if (remoteMessage) {
            setActiveChannel(await client.getChannelById(remoteMessage?.data?.channel_id))
            navigate('Conversations');
          }
        });
        messaging().setBackgroundMessageHandler(async remoteMessage => {
          console.log('Message handled in the background!', remoteMessage);
          if (remoteMessage) {
            setActiveChannel(await client.getChannelById(remoteMessage?.data?.channel_id))
            navigate('Conversations');
          }
        });

        messaging().getInitialNotification().then(async remoteMessage => {
          console.log('Notification caused app to open from killed state:', remoteMessage);
          if (remoteMessage) {
            setActiveChannel(await client.getChannelById(remoteMessage?.data?.channel_id))
            navigate('Conversations');
          }
        });
      };
      init();
    }
    return async () => {
      unsubscribeTokenRefreshListenerRef.current?.();
    };
  }, [profile, isProfileCreated])
  

  useEffect(() => {
    (async () => {
      const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
      console.log('storedRefreshToken', storedRefreshToken)
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
      await axios.delete(`${USER_SERVICE_BASE_URL}/sessions`, config)
      if (client.wsConnection.isHealthy) {
        await client.disconnectUser();
        console.log('Disconnected', client.userID, client.wsConnection.isHealthy);
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
      if (await getNewToken()) {
        return true;
      }
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ login, logout, refreshToken, isLoggedIn, isAuthenticated, authCall, isProfileCreated, isImageUploaded, getProfile, getChatToken, initChat, profile }}>
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

