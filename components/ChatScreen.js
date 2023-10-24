import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { CHAT_URL } from './constants';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AppBar from './AppBar';
import { ChannelList, useChatContext } from 'stream-chat-expo';


export default function ChatScreen() {
  const { profile, isAuthenticated, isProfileCreated } = useAuth();
  const navigation = useNavigation();
  const { client, setActiveChannel } = useChatContext();
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    return navigation.addListener('focus', () => {
      if (!isAuthenticated) {
        navigation.replace('Main', { screen: 'Home' })
        navigation.navigate('Signup');
        return;
      }
      if (!isProfileCreated) {
        navigation.replace('Main', { screen: 'Home' })
        navigation.navigate('UpdateProfile');
        return;
      }
    });
  }, []);

  useEffect(() => {
    const initChat = async () => {
      try {
        setConnection(await client.connectUser(
          {
            id: 'd547072b-a60d-4e9c-8611-a5cc514e9e3a',
            name: 'Tabrez Ahmed',
          },
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiZDU0NzA3MmItYTYwZC00ZTljLTg2MTEtYTVjYzUxNGU5ZTNhIiwiZXhwIjoxNjk4NjA4NzgzfQ.qO3Mu8k2YlrQg2z_vO3acmt23Qn8dFaK8zkpz1p9obU'
        ));
      } catch (e) {
        console.log(e);
      }
    };

    initChat();
  }, []);

  if (connection) {
    return (
      <>
        <AppBar title="Conversations" />
        <ChannelList 
          onSelect={(channel) => {
            setActiveChannel(channel);
            navigation.navigate('Conversations')
          }}
        />
      </>
    );
  }

  return (
    <></>
  );
}