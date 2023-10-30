import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { 
  Channel, 
  useChatContext,
  MessageList,
  MessageInput, 
} from 'stream-chat-expo';
import AppBar from './AppBar';
import { View } from 'react-native';


export default function Conversations() {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation();
  const { channel } = useChatContext();

  if (!isAuthenticated) {
    navigation.navigate('Signup');
  }

  return (
    <>
      <AppBar title={channel?.data?.name} />
      <View style={{flex: 1}}>
        <Channel channel={channel} hasCommands={false}>
          <MessageList />
          <MessageInput />
        </Channel>
      </View>
    </>
  )
}