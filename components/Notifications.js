import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import AppBar from './AppBar';
import { USER_SERVICE_BASE_URL } from './constants';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import Button from '../shared-components/button/Button';
import { useTheme } from 'react-native-paper';
import { useChatContext } from 'stream-chat-expo';
import { useData } from '../contexts/DataContext';

export default function NotificationsScreen() {
  const { isAuthenticated, isProfileCreated, authCall } = useAuth()
  const { notifications } = useData()

  const { client, setActiveChannel } = useChatContext()
  const navigation = useNavigation();
  const theme = useTheme()


  useEffect(() => {
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
  }, [])

  const handleNavigation = async (actionType, userId) => {
    const userInfo = await ViewProfile(userId)
    if(actionType === 'VIEW_PROFILE') {
      navigation.navigate('ViewProfile',  { userData: userInfo })
    }
    if(actionType === 'SEND_MESSAGE') {
      connectUser(userId)
    }
  }

  const ViewProfile = async (userId) => {
    try {
      const userInfo = (await authCall({
        method: 'GET',
        url: `${USER_SERVICE_BASE_URL}/users/${userId}`
      }))?.data;
      return userInfo
    } catch (e) {
      console.log(e)
    }
  }

  const connectUser = async (userId) => {
    try {
      const res = await authCall({
        method: 'POST',
        url: `${USER_SERVICE_BASE_URL}/users/me/connections`,
        data: {userId}
      })
      const channels = await fetchChannels()
      const channel = channels?.find(channel => channel.id === res.data.channelId);
      if(channel) {
        navigateToCommunityChat(channel)
      }
   } catch (e) {
      console.log(e)
   }
  }

  const fetchChannels = async () => {
    const filter = {
        members: { $in: [client.userID] }
    };
    const sort = { last_message_at: -1 }
    try {
      const channels = await client.queryChannels(filter, sort, {
        watch: true,
        state: true,
      })
      return channels
    } catch(error) {
      console.log('Channel Error', error)
    }
};

  const navigateToCommunityChat = async (channel) => {
    const newChannel = client.channel('messaging', channel.id)
    await newChannel.watch()
    await setActiveChannel(newChannel)
    navigation.navigate('Conversations')
  }


  if (isProfileCreated) {
    return (
      <>
        <AppBar title="Notifications" />
        <SafeAreaView>
          <ScrollView style={{ padding: 20, flexDirection:'column', gap: 10 }}>
              { notifications?.map((notification, index) => (
                  <View key={`${index}Notification`} style={{ display: 'flex', flexDirection: 'row', gap: 10, borderBottomWidth: 1, borderColor: 'lightgrey', paddingBottom: 10  }}>
                    <Image style={{ borderRadius: 100, borderWidth: 1, borderColor: '#fff' }} source={{ uri: notification.icon, width: 50, height: 50 }} />
                    <View style={{ flexDirection: 'column', gap: 8 }}>
                      <Text style={theme.fonts.subtitle}>{notification?.title} </Text>
                      <Text lineBreakMode='head' style={{...theme.fonts.description, maxWidth: '90%' }}>{notification.body || '-'} </Text>
                      <View style={{ flexDirection: 'row', gap: 10 }}>
                        {notification.actions?.map((action, index) => (
                          <Button key={`${index}actionType`} compact onPress={() => handleNavigation(action.actionType, action.actionData?.userId)} mode="contained"> {action.actionData?.actionLabel} </Button>
                        ))}
                      </View>
                    </View>
                  </View>
                ))
              }
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }

  return (
    <></>
  )
}