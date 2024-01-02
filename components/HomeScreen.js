import React, { useEffect, useState } from 'react'
import AppBar from './AppBar'
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import { useAuth } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'react-native-paper'
import Communities from './Communities';
import logo from './assets/logo.png'
import { UserCommunities } from './UserCommunities'

const HomeScreen = () => {
  const { profile } = useAuth()
  const navigation = useNavigation()
  const theme = useTheme()

  return (
    <ScrollView style={theme.colors.background} stickyHeaderIndices={[0]}>
      <AppBar title={<Image source={logo} style={theme.spacing.logo} statusBarColor="#FFF2CB" />}/>
      <UserCommunities />
      <View style={theme.spacing.home.container}>
       
        <View style={theme.spacing.home.section}>
          <Text style={theme.fonts.title}> {profile && `Hey ${profile?.firstName}, `}Welcome to Dubai!</Text>
        </View>
        <View style={theme.spacing.home.section}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('Communities', { isTextInputFocused: true })}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 1000, // Ensure it's above other content
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
            <TextInput
              style={theme.components.inputs.textField}
              placeholder="Search communities"
              placeholderTextColor="#888"
            />
            <TouchableOpacity onPress={() => undefined}>
              <Image
                source={require('./assets/icons/searchicon.png')}
                style={theme.spacing.home.searchIcon}
              />
            </TouchableOpacity>
        </View>
        
        <View> 
          <View style={theme.spacing.home.section}>
            <Text style={theme.fonts.subtitle}>Communities for you</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Communities')}>
              <Text>View all &gt;</Text>
            </TouchableOpacity>
          </View>
          <View style={theme.spacing.home.section}> 
            <Communities isHome={true}/>
          </View>
        </View>
        {/* <View style={styles.subHeader}>
          <Text style={styles.events}>Events for You</Text>
        </View>
        <View>
            <Image source={eventImage} style={{maxWidth: '100%', maxHeight: 250, aspectRatio: 6/4}} />
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.events}>Opportunities for You</Text>
        </View>
        <View>
            <Image source={opportunitiesImage} style={{maxWidth: '100%', maxHeight: 250, aspectRatio: 6/4}} />
        </View>
        <View style={styles.subHeader}>
          <Text style={styles.events}>Ads for You</Text>
        </View>
        <View>
            <Image source={adsImage} style={{maxWidth: '100%', maxHeight: 250, aspectRatio: 6/4}} />
        </View> */}
      </View>
    </ScrollView>
  )
}

export default HomeScreen
