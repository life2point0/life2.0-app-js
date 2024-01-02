import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider } from './contexts/AuthContext';
import theme from './themes/default.theme';
import Root from './components/Root';
import Login from './components/Login';
import UpdateProfile from './components/UpdateProfile';
import HomeScreen from './components/HomeScreen';
import { IconButton } from 'react-native-paper';
import Signup from './components/Signup';
import ChatScreen from './components/ChatScreen';
import Conversations from './components/Conversations';
import { StreamChat } from 'stream-chat';
import {Chat, OverlayProvider } from 'stream-chat-expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Communities from './components/Communities';
import { DataProvider, useData } from './contexts/DataContext';
import ProfileImageUpload from './components/ProfileImageUpload';
import { NavigationMenu } from './components/AppBar';
import ViewProfile from './components/ViewProfile';
import * as SystemUI from 'expo-system-ui';
import RenderIfConnected from './components/RenderIfConnected';
import UpdatePersonalDetails from './components/UpdatePersonalDetails';
import NotificationsScreen from './components/Notifications';
import { Text, View } from 'react-native';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const chatClient = StreamChat.getInstance('qbyjzjrwpnpm');


const getTabOptions = (iconName, unreadNotificationCount=0) => {
  return {
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'gray',
    tabBarLabelStyle: {
      fontSize: 12,
      fontWeight: 'bold',
    },
    tabBarInactiveLabelStyle: {
      fontSize: 10,
      fontWeight: 'normal',
    },
    tabBarIcon: ({ focused, color, size }) => (
      <View>
        <IconButton icon={iconName} iconColor={focused ? 'black': 'grey'} size={focused ? 28 : 24} />
        { unreadNotificationCount > 0 &&
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center',  width: 20, height: 20, position: 'absolute', zIndex: 999, top: 8, right: 8,  backgroundColor: 'red', borderRadius: 20 }}>
            <Text style={{ color: 'white' }}> { unreadNotificationCount || ''} </Text> 
          </View>  
          }
      </View>
    ),
    headerShown: false
  };
};

function SharedTabs(unreadNotificationCount) {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={getTabOptions('home-outline')}
      />
      <Tab.Screen 
        name="Chats" 
        component={ChatScreen} 
        options={getTabOptions('message-outline')}
      />
      <Tab.Screen 
        name="Notifications" 
        component={NotificationsScreen} 
        options={getTabOptions('bell-outline', unreadNotificationCount)}
      />
      <Tab.Screen 
        name="Profile" 
        component={ViewProfile} 
        options={getTabOptions('account-outline')}
      />
    </Tab.Navigator>
  );
}

const App = () => {  

  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#FFFFFF').catch((err) => {
      console.log(err)
    });
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OverlayProvider>
        <PaperProvider theme={theme}>
          <RenderIfConnected>
            <NavigationContainer>
              <Chat client={chatClient}>
                <AuthProvider>
                  <DataProvider> 
                      <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="Root" component={Root} />
                        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }}/>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Signup" component={Signup} />
                        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
                        <Stack.Screen name="ProfileImageUpload" component={ProfileImageUpload} />
                        <Stack.Screen name="UpdatePersonalDetails" component={UpdatePersonalDetails} />
                        <Stack.Screen name="Conversations" component={Conversations} />
                        <Stack.Screen name="Communities" component={Communities} />
                        <Stack.Screen name="ViewProfile" component={ViewProfile} />
                      </Stack.Navigator>
                      <Stack.Screen name="NavigationMenu" component={NavigationMenu} />
                  </DataProvider>
                </AuthProvider>
              </Chat>
            </NavigationContainer>
          </RenderIfConnected>
        </PaperProvider>
      </OverlayProvider>
    </GestureHandlerRootView>
  );
};

const MainScreen = () => {
  const { unreadNotificationsCount } = useData()
  return (
    SharedTabs(unreadNotificationsCount)
  )
}

export default App;
