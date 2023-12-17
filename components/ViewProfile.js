import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, Image, View, StatusBar } from 'react-native'
import { Text, useTheme, Icon, IconButton } from 'react-native-paper'
import { useAuth } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'

const ViewProfile = () => {
  
  const { profile, isAuthenticated } = useAuth()
  const navigation = useNavigation()
  const theme = useTheme()
  const joinedDate = new Date(profile?.joinedAt)
  const formattedJoinedDate = joinedDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.replace('Main', { screen: 'Home' })
      navigation.navigate('Signup')
      return
    }
    if (!profile?.description) {
      navigation.replace('Main', { screen: 'Home' })
      navigation.navigate('UpdateProfile')
      return
    }
  }, [isAuthenticated, profile])

  const renderImage = (photo, index) => (
    ( index <= 4) ? (
        <Image key={index}  style={{ borderRadius: 8 }} source={{ uri: photo.url, width: 100, height: 100  }} /> 
    ) : null
  )

  if (isAuthenticated && profile?.description) {
    return (
      <>
          <SafeAreaView style={{flex: 1 }}>
          <StatusBar backgroundColor='#fbfbfb' barStyle="dark-content" />
            <ScrollView contentContainerStyle={{ width: '100%', gap: 10, paddingBottom: 30, borderWidth: 1, borderColor: 'transparent' }}>
              
            <View>
              { <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                  { profile?.photos[0]?.url ? 
                  <Image style={{ borderRadius: 100, borderWidth: 5, borderColor: '#fff' }} source={{ uri: profile?.photos[0].url, width: 200, height: 200  }} /> :
                  <IconButton iconColor='#ccc' size={100} style={{ size: 200, width: 200, height: 200, borderRadius: 100, borderWidth: 5, borderColor: '#fff' }} icon='account-outline'></IconButton>                 }
                </View>  
              }

                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 5, padding: 20 }}>
                    <Text style={theme.fonts.title}> {profile?.firstName || '-' } { profile?.lastName || '-' }  </Text>
                    <Text style={{...theme.fonts.description,  textAlign: 'center'}}> Joined { formattedJoinedDate }  </Text>
                    <Text style={{...theme.fonts.description,  textAlign: 'center'}}> { profile?.description }  </Text>
                </View>


                <IconButton
                  icon="arrow-left"
                  style={theme.spacing.backButton}
                  onPress={() => navigation.goBack()}
                />
             </View>

              
              { profile?.photos[0]?.url && <View style={{ flexDirection: 'column', justifyContent: 'center', gap: 10, padding: 20, backgroundColor: 'white' }}>
                <Text style={theme.fonts.title}> Your Images  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                    {profile?.photos?.map((photo, index) => renderImage(photo, index))}
                  </ScrollView>
                </View>
              }
              <View style={{ flexDirection: 'column', gap: 8, paddingHorizontal: 20, paddingVertical: 8, backgroundColor: 'white'  }}>
                <View style={{ gap: 10,  borderColor: '#efefef', flexDirection: 'row', alignItems: 'center', paddingBottom: 8, borderBottomWidth: 1 }}>
                  <Icon size={25} color='#676767' source="location-exit"/> 
                  <View style={{ flexDirection: 'column', justifyContent: 'center' }}> 
                      <Text style={theme.fonts.subtitle}>Where Am I From  </Text> 
                      <Text style={theme.fonts.description }>{profile?.placeOfOrigin?.name || '-'} </Text>
                  </View> 
                </View>
                <View style={{ gap: 10, borderColor: '#efefef', alignItems: 'center', flexDirection: 'row', paddingBottom: 8, borderBottomWidth: 1 }}>
                  <Icon size={25} color='#676767' source="location-enter"/> 
                  <View style={{ flexDirection: 'column', justifyContent: 'center' }}> 
                      <Text style={theme.fonts.subtitle}>My New Home   </Text> 
                      <Text style={theme.fonts.description }>{profile?.currentPlace?.name || '-'}  </Text>
                  </View> 
                </View>
                <View style={{ gap: 10, borderColor: '#efefef', flexDirection: 'row', alignItems: 'center', paddingBottom: 8, borderBottomWidth: 1 }}>
                  <Icon size={25} color='#676767'source="briefcase-outline"/> 
                  <View style={{ flexDirection: 'column', justifyContent: 'center' }}> 
                      <Text style={theme.fonts.subtitle}>What I do   </Text> 
                      <Text style={theme.fonts.description}>
                        {profile?.occupations?.length > 0 ? (
                          profile.occupations.map((place, index) => (
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
                        {profile?.pastPlaces?.length > 0 ? (
                          profile.pastPlaces.map((place, index) => (
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
                        {profile?.skills?.length > 0 ? (
                          profile.skills.map((place, index) => (
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
                        {profile?.languages?.length > 0 ? (
                          profile.languages.map((place, index) => (
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
