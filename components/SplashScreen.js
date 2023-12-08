import { StatusBar, View } from "react-native";
import SplashLogo from './assets/splash.png';
import { Image } from 'react-native';

const SplashScreen = () => {
    return (
        <>
            <StatusBar backgroundColor="#FFF2CB" barStyle="dark-content" />
            <View
                style={{
                    height: '100%',
                    width: '100%',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FFF2CB',
                    padding: 0,
                    margin: 0
                }}
            >
            <Image source={SplashLogo} style={{width: '100%', resizeMode: 'contain'}} />
            </View>
        </>
    );
}

export default SplashScreen