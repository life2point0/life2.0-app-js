import React from 'react';
import { WebView } from 'react-native-webview';
import { CHAT_URL } from './constants';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';


export default function Conversations() {
  const { profile, isAuthenticated } = useAuth();
  const navigation = useNavigation();

  if (!isAuthenticated) {
    return navigation.navigate('Signup');
  }

  return (
    <WebView
      style={{marginTop: 30}}
      source={{ uri: `${CHAT_URL}/login?userId=${profile?.id}` }}
      // injectedJavaScript={`window.localStorage.clear();`}
    />
  );
}