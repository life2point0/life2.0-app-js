import { View } from "react-native";
import SplashLogo from './assets/splash-logo.png';
import { Image } from 'react-native';

const SplashScreen = () => {
    return (
        <View 
            style={{
                height: '100%',
                width: '100%',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#FFC003'
            }}
        >
          <Image source={SplashLogo} style={{maxWidth: '50%', resizeMode: 'contain'}} />
        </View>
    );
}

export default SplashScreen