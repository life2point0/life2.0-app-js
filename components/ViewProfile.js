import React, { useEffect } from 'react'
import { SafeAreaView, ScrollView, KeyboardAvoidingView, Image, View } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { useAuth } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import AppBar from './AppBar'
import user1Image from './assets/user-1.png'

const ViewProfile = () => {
  
  const { profile, isAuthenticated, isProfileCreated } = useAuth()
  const navigation = useNavigation()
  const theme = useTheme()
  const joinedDate = new Date(profile?.joinedAt)
  const formattedJoinedDate = joinedDate?.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
  
  useEffect(() => {
    return navigation.addListener('focus', () => {
      if (!isAuthenticated) {
        navigation.replace('Main', { screen: 'Home' })
        navigation.navigate('Signup')
        return
      }
      if (!isProfileCreated) {
        navigation.replace('Main', { screen: 'Home' })
        navigation.navigate('UpdateProfile')
        return
      }
    })
  }, [])

  const renderImage = (photo, index) => (
    ( index <= 4) ? (
        <Image key={index}  style={{ borderRadius: 8, width: '22%' }} source={{ uri: photo.url, height: 100  }} /> 
    ) : null
  )


  return (
        <>
            <AppBar/>
            <SafeAreaView style={{flex: 1, marginTop: -50 }}>
            <KeyboardAvoidingView behavior="height" style={{ gap: 10 }}>
              
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Image style={{ borderRadius: 100, borderWidth: 3, borderColor: '#fff' }} source={{ uri: profile?.photos[0].url, width: 100, height: 100  }} />
            </View>

            <ScrollView contentContainerStyle={{ gap: 10, paddingBottom: 100 }}>
            <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10, padding: 20 }}>
                <Text style={theme.fonts.title}> {profile?.firstName } { profile?.lastName }  </Text>
                <Text style={{...theme.fonts.description,  textAlign: 'center'}}> Joined { formattedJoinedDate }  </Text>
                <Text style={{...theme.fonts.description,  textAlign: 'center'}}> { profile?.description }  </Text>
            </View>
              <View style={{ flexDirection: 'column', gap: 10, padding: 20, backgroundColor: 'white' }}>
                <Text style={theme.fonts.title}> Your Images  </Text>
                <ScrollView horizontal removeClippedSubviews contentContainerStyle={{ overflow: 'auto',  width: '100%', flexDirection: 'row', marginRight: 50, gap: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
                  {profile?.photos?.map((photo, index) => renderImage(photo, index))}
                </ScrollView>
              </View>
              <View style={{ flexDirection: 'row', padding: 20, backgroundColor: 'white' }}>
                <View style={{ flexDirection: 'column', gap: 10 }}>
                  <View>
                    <Text style={theme.fonts.subtitle}> Where Am I From  </Text>
                    <Text style={theme.fonts.description }>  {profile?.placeOfOrigin.name} </Text>
                  </View>
                  <View>
                    <Text style={theme.fonts.subtitle}> My New Home  </Text>
                    <Text style={theme.fonts.description }> {profile?.currentPlace.name}  </Text>
                  </View>
                  <View>
                    <Text style={theme.fonts.subtitle}> What I do  </Text>
                    <Text style={theme.fonts.description }> {profile?.occupations[0].name }  </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'column', gap: 10 }}>
                  <View>
                    <Text style={theme.fonts.subtitle}> Places i have lived in  </Text>
                    <Text style={theme.fonts.description}>
                      {profile?.pastPlaces?.map((place, index, array) => (
                        <React.Fragment key={index}>
                          {place.name}
                          {index < array.length - 1 && ', '}
                        </React.Fragment>
                      ))}
                    </Text>
                  </View>
                  {/* <View>
                    <Text style={theme.fonts.subtitle}> Language i Speak  </Text>
                    <Text style={theme.fonts.description }> English  </Text>
                  </View>
                  <View>
                    <Text style={theme.fonts.subtitle}> My Interest  </Text>
                    <Text style={theme.fonts.description }>  </Text>
                  </View> */}
                </View>
              </View>
            </ScrollView>
            </KeyboardAvoidingView>
            </SafeAreaView>
        </>

  )
}

export default ViewProfile
