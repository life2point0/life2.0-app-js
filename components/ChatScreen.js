import React, { useEffect } from 'react';
import { WebView } from 'react-native-webview';
import { CHAT_URL } from './constants';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';


export default function ChatScreen() {
  const { profile, isAuthenticated, isProfileCreated } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    return navigation.addListener('focus', () => {
      navigation.replace('Main', { screen: 'Home' })
      if (!isAuthenticated) {
        navigation.navigate('Signup');
        return;
      } 
      if (!isProfileCreated) {
        navigation.navigate('UpdateProfile');
        return;
      }
      navigation.navigate('Conversations')
    });
  }, []);


  return (
    <></>
  );
}