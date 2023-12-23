import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { 
  Channel, 
  useChatContext,
  MessageList,
  MessageInput
} from 'stream-chat-expo';
import { View } from 'react-native';
import ChatScreenAppBar from './ChatScreenAppBar';
import defaultCommunityIcon from './assets/community.png'

export default function Conversations() {
  const { isAuthenticated } = useAuth();
  const navigation = useNavigation();
  const { channel } = useChatContext();

  if (!isAuthenticated) {
    navigation.navigate('Signup');
  }

  return (
    <>
      <ChatScreenAppBar title={channel?.data?.name} image={channel?.data?.image ? {uri: channel?.data?.image} : defaultCommunityIcon} />
      <View style={{flex: 1}}>
        <Channel channel={channel} hasCommands={false} >
          <MessageList />
          <MessageInput />
        </Channel>
      </View>
    </>
  )
}