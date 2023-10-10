import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import IntroSlides from "./IntroSlides";
import SplashScreen from "./SplashScreen";
import { View } from "react-native";

const Root = ({ navigation }) => {
    const [isInitialized, setInitialized] = useState(false);
    const [hasViewedIntro, setHasViewedIntro] = useState(false);

    const initialize = async () => {
        try {
            setHasViewedIntro(Boolean(await AsyncStorage.getItem('hasViewedIntro')))
        } catch (e) {
            setHasViewedIntro(false)
        }
        setTimeout(() => {
            setInitialized(true);
        }, 2000);
    }

    useEffect(() => {
        initialize();
    }, [])

    useEffect(() => {
        if (isInitialized && hasViewedIntro) {
            navigation.replace('Main', { screen: 'Home' });
        }
    }, [isInitialized, hasViewedIntro]);

    if (!isInitialized) {
        return <SplashScreen />;
    }

    if (!hasViewedIntro) {
        AsyncStorage.setItem('hasViewedIntro', 'true');
        return <IntroSlides />;
    }

    // If both conditions are met, this View will not be rendered because you will be navigated to 'Main' screen
    return <View />;
}

export default Root;
