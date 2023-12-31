import { View, Text, Image, StatusBar } from "react-native";
import SplashLogo from './assets/splash-logo.png';
import AppBar from "./AppBar";

const ComingSoonScreen = () => {
    return (
        <>
            <AppBar />
            <View 
                style={{
                    height: '100%',
                    width: '100%',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'gray'
                }}
            >
                <Image source={SplashLogo} style={{maxWidth: '50%', resizeMode: 'contain'}} />
                <Text style={{fontSize: 32}}>Coming Soon</Text>
            </View>
        </>
    );
}

export default ComingSoonScreen