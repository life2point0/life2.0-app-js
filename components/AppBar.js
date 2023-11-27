import React, { useState } from 'react'
import { Appbar, Avatar, useTheme, Modal, Portal } from 'react-native-paper'
import { Image, StatusBar, ScrollView, View, StyleSheet, Text } from 'react-native'
import menuIcon from './assets/menu-slider-icon.png'
import { useNavigation } from '@react-navigation/native'
import { useAuth } from '../contexts/AuthContext'
import Button from '../shared-components/button/Button'

const AppBar = ({ title, showBackButton }) => {
  const navigation = useNavigation()
  const { isProfileCreated, profile, logout } = useAuth()
  const theme = useTheme()
  const [isMenuVisible, setMenuVisible] = useState(false)

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible)
  }

  const handleNavigation = (route) => {
    setMenuVisible(false)
    navigation.navigate(route)
  }

  const handleLogout = async () => {
      try {
          await logout()
          handleNavigation('Home')
      } catch {
        console.log('Log out failed')
      }
  }

  return (
    <>
      <Appbar.Header style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: !isMenuVisible ? theme.colors.primaryContainer : '#fff' }}>
        {/* <StatusBar backgroundColor={!isMenuVisible ? theme.colors.primaryContainer : '#fff'} barStyle="dark-content" /> */}
        { profile && !showBackButton && (
          <Appbar.Action
            icon={() => <Image source={menuIcon} style={theme.spacing.appBar.menuIcon} />}
            onPress={toggleMenu}
          />
        )}
        {showBackButton && (
          <Appbar.Action
            icon="arrow-left"
            onPress={() => {
              navigation.navigate('Home')
            }}
          />
        )}
        <Appbar.Content style={{  flex: 1, alignItems: 'center' }} title={title || ''} />
        { profile?.photos?.[0]?.url && <Appbar.Action
          icon={() => (
            <Avatar.Image size={theme.spacing.appBar.avatar.size} source={{ uri: profile?.photos?.[0]?.url }} />
          )}
          onPress={() => {
            navigation.navigate('ViewProfile')
          }}
          />
          }
      </Appbar.Header>
      <Portal> 
        <Modal visible={isMenuVisible} transparent={true} onDismiss={toggleMenu} contentContainerStyle={styles.drawerContainer} animationType="slide">
            <ScrollView keyboardShouldPersistTaps="always">
              <Appbar.Action
                icon={() => <Image source={menuIcon} style={theme.spacing.appBar.menuIcon} />}
                onPress={toggleMenu}
              />
              <View style={styles.drawerSection}>
                <Avatar.Image size={theme.spacing.appBar.avatar.size} source={{ uri: profile?.photos?.[0]?.url }} />
                <View>
                  <Text style={theme.fonts.subtitle}> { profile?.firstName} { profile?.lastName } </Text>
                  <Text style={theme.fonts.description}> { profile?.email } </Text>
                </View>
              </View>
              <View>
                { isProfileCreated && <Button size='small' compact mode='text' contentStyle={styles.menuItem} onPress={() => handleNavigation('UpdateProfile')} icon="account-outline"> Edit profile </Button> }
                <Button size='small' compact  mode='text'  contentStyle={styles.menuItem} onPress={() => handleLogout()} icon="logout"> Logout </Button>
              </View>
            </ScrollView>
        </Modal>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  drawerContainer: {
    minWidth: 250,
    width: '50%',
    height: '100%',
    backgroundColor: '#fff',
    padding: 8
  },
  drawerSection: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 8,
    borderBottomWidth: 1,
    paddingBottom: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderColor: '#ccc'
  },
  menuItem: {
    marginTop: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16
  }
})

export default AppBar
