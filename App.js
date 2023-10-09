import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroSlides from './components/IntroSlides';
import Signup from './components/Signup';
import Login from './components/Login';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './themes/default.theme';
import { UpdateProfile } from './components/UpdateProfile';
import { AuthProvider } from './contexts/AuthContext';

const Stack = createNativeStackNavigator();


const App= ()=> {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="IntroSlides" component={IntroSlides} />
            <Stack.Screen name="Signup" component={Signup} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}

export default App;