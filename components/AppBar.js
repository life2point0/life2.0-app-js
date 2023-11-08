import React from 'react'
import { Appbar, Avatar, useTheme } from 'react-native-paper'
import logo from './assets/logo.png'
import { Image, StatusBar } from 'react-native'
import menuIcon from './assets/menu-slider-icon.png'

const AppBar = ({ title }) => {
  const theme = useTheme()
  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.primaryContainer }}>
      <StatusBar backgroundColor= {theme.colors.primaryContainer} barStyle="dark-content" />
      <Appbar.Action
        icon={() => <Image source={menuIcon} style={theme.spacing.appBar.menuIcon} />}
        onPress={() => {
          /* Implement navigation logic here */
        }}
      />
      <Appbar.Content style={{ alignItems: 'center' }} title={title || <Image source={logo} style={theme.spacing.logo} />} />
      <Appbar.Action
        icon={() => <Avatar.Icon size={theme.spacing.appBar.avatar.size} icon="account" />}
        onPress={() => {
          /* Implement profile logic here */
        }}
      />
    </Appbar.Header>
  )
}

export default AppBar
