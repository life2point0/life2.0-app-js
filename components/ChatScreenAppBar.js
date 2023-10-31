import React from 'react';
import { Appbar, Avatar, Text } from 'react-native-paper';
import logo from './assets/logo.png';
import { Image, StatusBar, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const ChatScreenAppBar = ({ title, image }) => {
  const navigation = useNavigation();
  return (
    <Appbar.Header style={{ backgroundColor: '#FFC003', position: '' }}>
      <StatusBar backgroundColor="#FFC003" barStyle="light-content" />
      <Appbar.Action
        icon="arrow-left"
        onPress={() => {
          navigation.navigate('Chats')
        }}
      />
      <Appbar.Content 
        title={
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 8}}>
            <Avatar.Image size={36} style={{backgroundColor: '#fff'}} source={image} />
            <Text style={{fontSize: 20}}>{title}</Text>
          </View>
        }
      />
    </Appbar.Header>
  );
};

export default ChatScreenAppBar;
