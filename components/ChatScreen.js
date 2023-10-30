import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AppBar from './AppBar';
import { ChannelList, useChatContext } from 'stream-chat-expo';


export default function ChatScreen() {
  const { isAuthenticated, isProfileCreated, chatToken, profile } = useAuth();
  const navigation = useNavigation();
  const { setActiveChannel } = useChatContext();

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

  if (chatToken) {
    return (
      <>
        <AppBar title="Conversations" />
        <ChannelList 
          onSelect={(channel) => {
            setActiveChannel(channel);
            navigation.navigate('Conversations')
          }}
          filters= {{ members: { '$in': [profile.id]}}}
        />
      </>
    );
  }

  return (
    <></>
  );
}