import React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import logo from './assets/LIFE2.0.png';
import { Image } from 'react-native';

const AppBar = ({ title }) => {
  return (
    <Appbar.Header style={{ backgroundColor: '#FFC003' }}>
        <Appbar.Action icon="menu" onPress={() => { /* Implement navigation logic here */ }} />
        <Appbar.Content 
            title={title || <Image source={logo}/>} 
            style={{ alignItems: 'center' }}
        />
      <Appbar.Action icon={() => <Avatar.Icon size={24} icon="account" />} onPress={() => { /* Implement profile logic here */ }} />
    </Appbar.Header>
  );
};

export default AppBar;
