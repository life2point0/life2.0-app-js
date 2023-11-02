import React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import logo from './assets/logo.png';
import { Image, StatusBar } from 'react-native';

// Import your custom menu icon image
import menuIcon from './assets/menu-slider-icon.png';

const AppBar = ({ title }) => {
  return (
    <Appbar.Header style={{ backgroundColor: '#FFC003', position: '' }}>
      <StatusBar backgroundColor="#FFC003" barStyle="dark-content" />
      <Appbar.Action
        icon={() => <Image source={menuIcon} style={{ width: 24, height: 24 }} />}
        onPress={() => {
          /* Implement navigation logic here */
        }}
      />
      <Appbar.Content title={title || <Image source={logo} style={{flex: 1, maxHeight: 32}} resizeMode="contain"/>} style={{ alignItems: 'center' }}  />
      <Appbar.Action
        icon={() => <Avatar.Icon size={30} icon="account" />}
        onPress={() => {
          /* Implement profile logic here */
        }}
      />
    </Appbar.Header>
  );
};

export default AppBar;
