import React from 'react';
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
import { CometChat } from '@cometchat-pro/react-native-chat';
import { COMET_CHAT_APP_ID } from './components/constants';
import Conversations from './components/Conversations';

const appSetting = new CometChat.AppSettingsBuilder().subscribePresenceForAllUsers().setRegion('in').build();
CometChat.init(COMET_CHAT_APP_ID, appSetting).then(
  () => {
  },
  (error) => {
  }
);


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


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
      <IconButton icon={iconName} color={focused ? 'gray': 'black'} size={focused ? 28 : 24} />
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
        options={getTabOptions('home')}
      />
      <Tab.Screen 
        name="Chats" 
        component={ChatScreen} 
        options={getTabOptions('chat')}
      />
      <Tab.Screen 
        name="Notifications" 
        component={ComingSoonScreen} 
        options={getTabOptions('bell')}
      />
      <Tab.Screen 
        name="Profile" 
        component={ComingSoonScreen} 
        options={getTabOptions('account')}
      />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Root" component={Root} />
            <Stack.Screen name="Main" component={SharedTabs} options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
            <Stack.Screen name="Conversations" component={Conversations} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;
