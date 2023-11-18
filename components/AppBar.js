import React, { useState } from 'react'
import { Appbar, Avatar, useTheme, Modal, Portal } from 'react-native-paper'
import logo from './assets/logo.png'
import { Image, StatusBar, ScrollView, View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import menuIcon from './assets/menu-slider-icon.png'
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext'

const AppBar = ({ title, showBackButton }) => {
  const navigation = useNavigation()
  const { isProfileCreated } = useAuth()
  const theme = useTheme()
  const [isMenuVisible, setMenuVisible] = useState(false)

  const toggleMenu = () => {
    setMenuVisible(!isMenuVisible)
  }

  const handleNavigation = (route) => {
    setMenuVisible(false)
    navigation.navigate(route)
  }

  return (
    <Appbar.Header style={{ backgroundColor: !isMenuVisible ? theme.colors.primaryContainer : '#fff' }}>
      <StatusBar backgroundColor= {!isMenuVisible ? theme.colors.primaryContainer : '#fff'} barStyle="dark-content" />
      { !showBackButton && isProfileCreated &&
        <Appbar.Action
          icon={() => <Image source={menuIcon} style={theme.spacing.appBar.menuIcon} />}
        />
      }
      { showBackButton && <Appbar.Action
        icon="arrow-left"
        onPress={() => {
          navigation.navigate('Home')
        }}
      /> }
      <Appbar.Content style={{ alignItems: 'center' }} title={title || <Image source={logo} style={theme.spacing.logo} />} />
      <Appbar.Action
        icon={() => <Avatar.Icon size={theme.spacing.appBar.avatar.size} icon="account" />}
        onPress={() => {
          /* Implement profile logic here */
        }}
      />

      <Portal>
        <Modal visible={isMenuVisible} onDismiss={toggleMenu} contentContainerStyle={{ flex: 1 }}>
          <ScrollView keyboardShouldPersistTaps='always'>
          <View style={styles.container}>
            <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('UpdateProfile')}>
              <Text> Edit profile </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={() => console.log('Menu item 2 clicked')}>
              <Text></Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={toggleMenu}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </Modal>
      </Portal>

    </Appbar.Header>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  menuItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  closeButton: {
    marginTop: 16,
    padding: 16,
    backgroundColor: 'lightgray',
  },
})


export default AppBar
