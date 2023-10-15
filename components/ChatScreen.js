import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { CHAT_URL } from './constants';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';


export default function ChatScreen() {
  const { profile, isAuthenticated } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    return navigation.addListener('focus', () => {
      if (isAuthenticated) {
        navigation.replace('Conversations')
      } else {
        navigation.replace('Signup')
      }
    });
  }, [])


  return (
    <></>
  );
}