import React, { useEffect } from 'react';
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
import ComingSoonScreen from './components/ComingSoonScreen';
import Signup from './components/Signup';
import ChatScreen from './components/ChatScreen';
import Conversations from './components/Conversations';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  OverlayProvider
} from 'stream-chat-expo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Communities from './components/Communities';
import { DataProvider } from './contexts/DataContext';
import ProfileImageUpload from './components/ProfileImageUpload';
import { NavigationMenu } from './components/AppBar';
import ViewProfile from './components/ViewProfile';
import * as SystemUI from 'expo-system-ui';

SystemUI.setBackgroundColorAsync('#FFFFFF');



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const chatClient = StreamChat.getInstance('ys9k7stx4245');


const getTabOptions = (iconName) => {
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
      <IconButton icon={iconName} iconColor={focused ? 'black': 'grey'} size={focused ? 28 : 24} />
    ),
    headerShown: false
  };
};

function SharedTabs() {
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
        component={ComingSoonScreen} 
        options={getTabOptions('bell-outline')}
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
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <OverlayProvider>
        <Chat client={chatClient}>
          <DataProvider> 
            <AuthProvider>
              <PaperProvider theme={theme}>
                <NavigationContainer>
                  <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Root" component={Root} />
                    <Stack.Screen name="Main" component={SharedTabs} options={{ headerShown: false }}/>
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={Signup} />
                    <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
                    {/* <Stack.Screen name="ViewProfile" component={ViewProfile} /> */}
                    <Stack.Screen name="ProfileImageUpload" component={ProfileImageUpload} />
                    <Stack.Screen name="Conversations" component={Conversations} />
                    <Stack.Screen name="Communities" component={Communities} />
                  </Stack.Navigator>
                  <Stack.Screen name="NavigationMenu" component={NavigationMenu} />
                </NavigationContainer>
              </PaperProvider>
            </AuthProvider>
          </DataProvider>
        </Chat>
      </OverlayProvider>
    </GestureHandlerRootView>
  );
};

export default App;
