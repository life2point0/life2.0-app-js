import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, Image, View, StatusBar } from 'react-native'
import { Text, useTheme, Icon, IconButton } from 'react-native-paper'
import { useAuth } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import Button from '../shared-components/button/Button'
import { USER_SERVICE_BASE_URL } from './constants'
import { useChatContext } from 'stream-chat-expo'

const ViewProfile = ({ route }) => {
  
  const navigation = useNavigation()
  const theme = useTheme()
  const { profile, isAuthenticated, authCall } = useAuth()
  const { client, setActiveChannel } = useChatContext()

  const { userData } = route?.params || {}
  const userInfo = userData || profile

  const formattedJoinedDate = joinedDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  const joinedDate = new Date(profile?.joinedAt)


  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('Main', { screen: 'Home' })
      navigation.navigate('Signup')
      return
    }
    if (!userInfo?.description) {
      navigation.replace('Main', { screen: 'Home' })
      navigation.navigate('UpdateProfile')
      return
    }
  }, [isAuthenticated, userInfo])

  const connectUser = async () => {
    try {
      const res = await authCall({
        method: 'POST',
        url: `${USER_SERVICE_BASE_URL}/users/me/connections`,
        data: {userId: userData.id}
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
    const sort = { last_message_at: -1 };
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

  const renderImage = (photo, index) => (
    ( index <= 4) ? (
        <Image key={index}  style={{ borderRadius: 8 }} source={{ uri: photo.url, width: 100, height: 100  }} /> 
    ) : null
  )

  if (isAuthenticated && (userInfo?.description)) {
    return (
      <>
          <SafeAreaView style={{flex: 1 }}>
          <StatusBar backgroundColor='#fbfbfb' barStyle="dark-content" />
            <ScrollView contentContainerStyle={{ width: '100%', gap: 10, paddingBottom: 30, borderWidth: 1, borderColor: 'transparent' }}>
              
            <View>
              { <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                  { userInfo?.photos[0]?.url ? 
                  <Image style={{ borderRadius: 100, borderWidth: 5, borderColor: '#fff' }} source={{ uri: userInfo?.photos[0].url, width: 200, height: 200  }} /> :
                  <IconButton iconColor='#ccc' size={100} style={{ size: 200, width: 200, height: 200, borderRadius: 100, borderWidth: 5, borderColor: '#fff' }} icon='account-outline'></IconButton>                 }
                </View>  
              }

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 5, padding: 20 }}>
                    <Text style={theme.fonts.title}> {userInfo?.firstName || '-' } { userInfo?.lastName || '-' } </Text> 
                    <Text style={{...theme.fonts.description,  textAlign: 'center'}}> Joined { formattedJoinedDate }  </Text>
                    <Text style={{...theme.fonts.description,  textAlign: 'center'}}> { userInfo?.description }  </Text>
                    { userData && <Button onPress={connectUser} mode="outlined" textColor="#676767" style={{ marginTop: 5, borderColor: '#ccc' }} labelStyle={{ lineHeight: 15 }} icon={userData?.isConnection ? 'message-outline' : 'account-plus-outline'} compact> {userData?.isConnection ? 'Message' : 'Connect' } </Button> }
                </View>


                <IconButton
                  icon="arrow-left"
                  style={theme.spacing.backButton}
                  onPress={() => navigation.goBack()}
                />
             </View>

              
              { userInfo?.photos[0]?.url && <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 10, padding: 20, backgroundColor: 'white' }}>
                <Text style={theme.fonts.title}> Your Images  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                    {userInfo?.photos?.map((photo, index) => renderImage(photo, index))}
                  </ScrollView>
                </View>
              }
              <View style={{ flexDirection: 'column', gap: 8, paddingHorizontal: 20, paddingVertical: 8, backgroundColor: 'white'  }}>
                <View style={{ gap: 10,  borderColor: '#efefef', flexDirection: 'row', alignItems: 'center', paddingBottom: 8, borderBottomWidth: 1 }}>
                  <Icon size={25} color='#676767' source="location-exit"/> 
                  <View style={{ flexDirection: 'column', justifyContent: 'center' }}> 
                      <Text style={theme.fonts.subtitle}>Where Am I From  </Text> 
                      <Text style={theme.fonts.description }>{userInfo?.placeOfOrigin?.name || '-'} </Text>
                  </View> 
                </View>
                <View style={{ gap: 10, borderColor: '#efefef', alignItems: 'center', flexDirection: 'row', paddingBottom: 8, borderBottomWidth: 1 }}>
                  <Icon size={25} color='#676767' source="location-enter"/> 
                  <View style={{ flexDirection: 'column', justifyContent: 'center' }}> 
                      <Text style={theme.fonts.subtitle}>My New Home   </Text> 
                      <Text style={theme.fonts.description }>{userInfo?.currentPlace?.name || '-'}  </Text>
                  </View> 
                </View>
                <View style={{ gap: 10, borderColor: '#efefef', flexDirection: 'row', alignItems: 'center', paddingBottom: 8, borderBottomWidth: 1 }}>
                  <Icon size={25} color='#676767'source="briefcase-outline"/> 
                  <View style={{ flexDirection: 'column', justifyContent: 'center' }}> 
                      <Text style={theme.fonts.subtitle}>What I do   </Text> 
                      <Text style={theme.fonts.description}>
                        {userInfo?.occupations?.length > 0 ? (
                          userInfo.occupations.map((place, index) => (
                            <React.Fragment key={place?.name}>
                              {index > 0 && ', '}
                              {place?.name}
                            </React.Fragment>
                          ))
                        ) : (
                          '-'
                        )}
                      </Text>
                  </View> 
                </View>
                <View style={{ gap: 10, borderColor: '#efefef', flexDirection: 'row', alignItems: 'center', paddingBottom: 8, borderBottomWidth: 1 }}>
                  <Icon size={25} color='#676767' source="map-marker-check-outline"/> 
                  <View style={{ flexDirection: 'column', justifyContent: 'center' }}> 
                      <Text style={theme.fonts.subtitle}>Places I have lived in   </Text> 
                      <Text style={{ ...theme.fonts.description}}>
                        {userInfo?.pastPlaces?.length > 0 ? (
                          userInfo.pastPlaces.map((place, index) => (
                            <React.Fragment key={place?.name}>
                              {index > 0 && ', '}
                              {place?.name}
                            </React.Fragment>
                          ))
                        ) : (
                          '-'
                        )}
                      </Text>
                  </View> 
                </View>
                <View style={{ gap: 10, borderColor: '#efefef', flexDirection: 'row', alignItems: 'center', paddingBottom: 8, borderBottomWidth: 1 }}>
                  <Icon size={25} color='#676767' source="playlist-edit"/> 
                  <View style={{ flexDirection: 'column', justifyContent: 'center' }}> 
                      <Text style={theme.fonts.subtitle}>My Interests </Text> 
                      <Text style={theme.fonts.description}>
                        {userInfo?.skills?.length > 0 ? (
                          userInfo.skills.map((place, index) => (
                            <React.Fragment key={place?.name}>
                              {index > 0 && ', '}
                              {place?.name}
                            </React.Fragment>
                          ))
                        ) : (
                          '-'
                        )}
                      </Text>
                  </View> 
                </View>
                <View style={{ gap: 10, alignItems: 'center', flexDirection: 'row'}}>
                  <Icon size={25} color='#676767' source="account-tie-voice"/> 
                  <View style={{ flexDirection: 'column', justifyContent: 'center' }}> 
                      <Text style={theme.fonts.subtitle}>Languages I Speak   </Text> 
                      <Text style={theme.fonts.description}>
                        {userInfo?.languages?.length > 0 ? (
                          userInfo.languages.map((place, index) => (
                            <React.Fragment key={place?.name}>
                              {index > 0 && ', '}
                              {place?.name}
                            </React.Fragment>
                          ))
                        ) : (
                          '-'
                        )}
                      </Text>
                  </View> 
                </View>
              </View>
            </ScrollView>
          </SafeAreaView>
      </>

    )
  } 

  return (
    <></>
  )
}

export default ViewProfile
