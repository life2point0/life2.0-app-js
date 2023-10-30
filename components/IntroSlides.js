import React, { Fragment, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { PrimaryButton } from './PrimaryButton';
import { Button, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const slides = [
  {
    title: 'Welcome to Life 2.0',
    description: 'Moving to a new city or new country? Now immediately find like-minded people who will help you settle in!',
    image: require('./assets/intro-1.png'),
    logo: require('./assets/logo.png'),
    buttons: [
      { label: 'Next', action: 'next', type: 'primary' },
      { label: 'Skip', action: 'skip' },
    ],
  },
  {
    title: 'Introduce yourself to people in your city!',
    description: 'Setup your profile and connect with people with similar interests and backgrounds in your new city.',
    image: require('./assets/intro-2.png'),
    logo: require('./assets/logo.png'),
    buttons: [
      { label: 'Next', action: 'next', type: 'primary' },
      { label: 'Skip', action: 'skip' },
    ],
  },
  {
    title: 'Explore opportunities in your new city!',
    description: 'Life 2.0 will match you with communities, meetups & jobs in your new community. Offer help when you can, seek help when you need.',
    image: require('./assets/intro-3.png'),
    logo: require('./assets/logo.png'),
    buttons: [
      { label: 'Start Exploring', action: 'home', type: 'primary' },
    ],
  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white', // Change the background color if needed
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  backButtonText: {
    color: 'black',
  },
  imageContainer: {
    width: 300,
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 200,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  slide: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'stretch',
    padding: 20
  },
  button: {
    // backgroundColor: 'transparent',
    // borderColor: 'black',
    // borderWidth: 1,
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    // borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 8,
  },
  buttonText: {
    color: 'black',
  },
});


const IntroSlides = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const navigation = useNavigation();

  const handleButtonPress = (action) => {
    switch (action) {
      case 'next':
        if (currentScreen < slides.length - 1) {
          setCurrentScreen(currentScreen + 1);
        }
        break;
      case 'skip':
        setCurrentScreen(2);
        break;
      case 'back':
        if (currentScreen > 0) {
          setCurrentScreen(currentScreen - 1);
        }
        break;
      case 'login':
        navigation.navigate('Login');
        break;
      case 'home':
        navigation.navigate('Main', { screen: 'Home' });
        break;
      default:
        break;
    }
  };

  const slide = slides[currentScreen];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {currentScreen > 0 && (
        <IconButton
          style={styles.backButton}
          onPress={() => handleButtonPress('back')}
          icon="arrow-left"
        />
      )}
      <View style={styles.slide}>
        <Image source={slide.logo} style={styles.logo}/>
        <View style={styles.imageContainer}>
          <Image source={slide.image} style={styles.image} resizeMode="contain" />
        </View>
        <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.description}>{slide.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {slide.buttons.map((button, buttonIndex) => (
            <Fragment key={buttonIndex}>
            {
              button.type === 'primary' 
              ? <PrimaryButton textColor='#FFC003' mode='contained' style={styles.button} onPress={() => handleButtonPress(button.action)}>{button.label}</PrimaryButton>
              : <Button mode="outlined" style={styles.button} onPress={() => handleButtonPress(button.action)}>{button.label}</Button>
            }
            </Fragment>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};
export default IntroSlides;
