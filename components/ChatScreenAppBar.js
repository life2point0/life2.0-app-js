import React from 'react';
import { Appbar, Avatar, Text, useTheme } from 'react-native-paper';
import logo from './assets/logo.png';
import { Image, StatusBar, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const ChatScreenAppBar = ({ title, image }) => {
  const navigation = useNavigation()
  const theme = useTheme()
  return (
    <Appbar.Header style={{ backgroundColor:  theme.colors.primaryContainer , position: '' }}>
      <StatusBar backgroundColor="#FFC003" barStyle="dark-content" />
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
            <Text style={theme.fonts.title}>{title}</Text>
          </View>
        }
      />
    </Appbar.Header>
  );
};

export default ChatScreenAppBar;
