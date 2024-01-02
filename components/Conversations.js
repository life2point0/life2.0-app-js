import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { 
  Channel, 
  useChatContext,
  MessageList,
  MessageInput,
  Message
} from 'stream-chat-expo';
import { View, Image, TouchableOpacity } from 'react-native';
import ChatScreenAppBar from './ChatScreenAppBar';
import defaultCommunityIcon from './assets/community.png'
import { USER_SERVICE_BASE_URL } from './constants';

export default function Conversations({ route }) {
  const { isAuthenticated, authCall, profile } = useAuth();
  const navigation = useNavigation();
  const { channel } = useChatContext();
  const [otherMember, setOtherMember] = useState(null)

  useEffect(() => {
    if (channel.type === 'messaging') {
      getMembers()
    }
  }, [otherMember])

  const getMembers = async () => {
    try {
      const members = (await channel.queryMembers({})).members
      const connectedUser = members.find((member) => member.user_id !== profile.id)
      if (connectedUser) {
        const connectedUserData = {
          name: connectedUser.user?.name, 
          image: connectedUser.user?.image
        }
        setOtherMember(connectedUserData)
      }
    } catch(error) {
      console.log('Setting other memeber failed')
    }

  }

  if (!isAuthenticated) {
    navigation.navigate('Signup');
  }

  const title = channel?.data?.name || otherMember?.name || ''
  const image = channel?.data?.image ||  otherMember?.image || null


  const MessageComponent = (props) => {

    const isMyMessage = props.message.user.id === profile.id
    const shouldShowAvatar = props.message.groupStyles[0] === 'bottom' || props.message.groupStyles[0] === 'single'
    const handleAvatarClick = async (userId) => {
      try {
        const userInfo = (await authCall({
          method: 'GET',
          url: `${USER_SERVICE_BASE_URL}/users/${userId}`
        }))?.data;
        navigation.replace('Main', { screen: 'Home' })
        navigation.navigate('ViewProfile',  { userData: userInfo })
      } catch (e) {
        console.log(e)
      }
    }

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: isMyMessage ? 'flex-end' : 'start' }}> 
          {  !isMyMessage && shouldShowAvatar ? 
            <TouchableOpacity style={{ position: 'absolute', zIndex: 100 }} onPress={() => handleAvatarClick(props.message.user.id)}> 
              <Image source={{ uri: props.message.user.image, width: 30, height: 30}} style={{borderRadius: 50, marginLeft: 10}} /> 
            </TouchableOpacity> 
            : <></> 
          }
        <Message
          showAvatar={false}
          {...props}
        />
      </View>
      // <Message
      //   {...props}
      //   onPress={(data) => handleAvatarClick(data.message.user.id)}
      // />

    )
  }

  return (
    <>
      <ChatScreenAppBar title={title} image={image ? {uri: image} : defaultCommunityIcon} />
      <View style={{flex: 1}}>
        <Channel channel={channel} hasCommands={false} >
          <MessageList Message={MessageComponent}/> 
          <MessageInput />
        </Channel>
      </View>
    </>
  )
}