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
  const [isLoading, setIsLoading] = useState(false)

  const { userData } = route?.params || {}
  
  const userInfo = userData || profile

  const joinedDate = new Date(profile?.joinedAt)
  const formattedJoinedDate = joinedDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const buttonText = userData?.isConnection ? 'Message' : 'Connect' 


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
    setIsLoading(true)
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
   } finally {
    setIsLoading(false)
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
          <StatusBar backgroundColor={theme.colors.primaryContainer} barStyle="dark-content" />
            <ScrollView contentContainerStyle={{ width: '100%', paddingBottom: 30 }}>
            <IconButton
                    icon="arrow-left"
                    style={{...theme.spacing.backButton, zIndex: 999 }}
                    onPress={() => navigation.goBack()}
            />
            <View style={{ backgroundColor: theme.colors.primaryContainer, height: 150, position: 'relative', width: '100%' }}>
                <View style={{ alignItems: 'center', marginTop: 100 }}>
                  { userInfo?.photos[0]?.url ? 
                  <Image style={{ borderRadius: 100, borderWidth: 4, borderColor: '#fff' }} source={{ uri: userInfo?.photos[0].url, width: 100, height: 100  }} /> :
                  <IconButton iconColor='#ccc' size={100} style={{ size: 200, width: 100, height: 100, borderRadius: 100, borderWidth: 5, borderColor: '#fff' }} icon='account-outline'></IconButton>                 
                  }
                  <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 5, padding: 5 }}>
                    <Text style={{ ...theme.fonts.subtitle, fontWeight: 700 }}> {userInfo?.firstName || '-' } { userInfo?.lastName || '-' } </Text> 
                    <Text style={{...theme.fonts.description,  textAlign: 'center'}}> Joined { formattedJoinedDate }  </Text>
                    { 
                    userData && <Button loading={isLoading} onPress={connectUser} mode="outlined" textColor="#676767" style={{ marginTop: 5, borderColor: '#ccc' }} labelStyle={{ lineHeight: 15 }} icon={userData?.isConnection ? 'message-outline' : 'account-plus-outline'} compact> {buttonText}  </Button> 
                    }
                  </View>
                </View>  
             </View>

              <View style={{ flexDirection: 'column', gap: 20, marginTop: userData ? 160 : 120, paddingHorizontal: 20, paddingVertical: 8 }}>
                <View style={{ gap: 10,  borderColor: '#efefef', flexDirection: 'row', alignItems: 'center', paddingBottom: 8 }}>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 8 }}> 
                        <Text style={{ ...theme.fonts.subtitle, fontWeight: 700 }}> About me  </Text> 
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 10 }}>
                          <Text style={{...theme.fonts.description,  textAlign: 'center'}}> { userInfo?.description }  </Text>
                        </View>               
                  </View> 
                </View>
                { userInfo?.photos[0]?.url && <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 10}}>
                  <Text style={{ ...theme.fonts.subtitle, fontWeight: 700 }}> Your Images  </Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                      {userInfo?.photos?.map((photo, index) => renderImage(photo, index))}
                    </ScrollView>
                  </View>
                }
                
                <View style={{ gap: 10, borderColor: '#efefef', alignItems: 'center', flexDirection: 'row', paddingBottom: 8 }}>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 8 }}> 
                      <Text style={{ ...theme.fonts.subtitle, fontWeight: 700 }}>Place I call my new home </Text>  
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 10 }}>
                        <Text style={{ backgroundColor: userInfo?.currentPlace?.name ? theme.colors.tertiaryColor : 'white', padding: 8, width: 'auto', borderRadius: 8 }}> {userInfo?.currentPlace?.name || '-'} </Text>       
                      </View>                
                  </View> 
                </View>

                <View style={{ gap: 10,  borderColor: '#efefef', flexDirection: 'row', alignItems: 'center', paddingBottom: 8 }}>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 8 }}> 
                      <Text style={{ ...theme.fonts.subtitle, fontWeight: 700 }}> Place where I grew up  </Text> 
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 10, flexWrap: 'wrap'  }}>
                        <Text style={{ backgroundColor: userInfo?.placeOfOrigin?.name ? theme.colors.tertiaryColor : 'transparent', padding: 8, width: 'auto', borderRadius: 8 }}> {userInfo?.placeOfOrigin?.name || '-'} </Text>        
                      </View>               
                  </View> 
                </View>
                <View style={{ gap: 10, borderColor: '#efefef', flexDirection: 'row', alignItems: 'center', paddingBottom: 8 }}>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 8 }}> 
                      <Text  style={{ ...theme.fonts.subtitle, fontWeight: 700 }}>My current profession   </Text> 
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 10, flexWrap: 'wrap' }}>
                        {userInfo?.occupations?.length > 0 ? (
                          userInfo.occupations.map((place) => (
                            <Text key={place?.name} style={{ backgroundColor: theme.colors.tertiaryColor, padding: 8, width: 'auto', borderRadius: 8 }}> { place?.name } </Text>                       
                          ))
                        ) : (
                          <Text> - </Text>
                        )}
                        </View>
                  </View> 
                </View>
                <View style={{ gap: 10, borderColor: '#efefef', flexDirection: 'row', alignItems: 'center', paddingBottom: 8 }}>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 8 }}> 
                      <Text style={{ ...theme.fonts.subtitle, fontWeight: 700 }}> Other Cities I have lived in   </Text> 
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 10, flexWrap: 'wrap' }}> 
                          {userInfo?.pastPlaces?.length > 0 ? (
                            userInfo.pastPlaces.map((place) => (
                              <Text key={place?.name} style={{ backgroundColor: theme.colors.tertiaryColor, padding: 8, width: 'auto', borderRadius: 8 }}> { place?.name } </Text>                       
                            ))
                          ) : (
                            <Text> - </Text>
                          )}
                        </View>
                  </View> 
                </View>
                <View style={{ gap: 10, borderColor: '#efefef', flexDirection: 'row', alignItems: 'center', paddingBottom: 8 }}>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 8 }}> 
                      <Text style={{ ...theme.fonts.subtitle, fontWeight: 700 }}>My Hobbies and Interests </Text> 
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 10, flexWrap: 'wrap' }}>
                        {userInfo?.skills?.length > 0 ? (
                          userInfo.skills.map((place) => (
                            <Text key={place?.name} style={{ backgroundColor: theme.colors.tertiaryColor, padding: 8, width: 'auto', borderRadius: 8 }}> { place?.name } </Text>
                          ))
                        ) : (
                          <Text> - </Text>
                        )}
                      </View>
                  </View> 
                </View>
                <View style={{ gap: 10, alignItems: 'center', flexDirection: 'row'}}>
                  <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 8 }}> 
                      <Text style={{ ...theme.fonts.subtitle, fontWeight: 700 }}>Languages I Speak   </Text> 
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', gap: 10, flexWrap: 'wrap' }}>
                        {userInfo?.languages?.length > 0 ? (
                          userInfo.languages.map((place) => (
                            <Text key={place?.name} style={{ backgroundColor: theme.colors.tertiaryColor, padding: 8, width: 'auto', borderRadius: 8 }}> { place?.name } </Text>
                          ))
                        ) : (
                          <Text> - </Text>
                        )}
                      </View>
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
