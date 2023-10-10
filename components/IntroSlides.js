import React, { Fragment, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { PrimaryButton } from './PrimaryButton';
import { Button, IconButton } from 'react-native-paper';

const slides = [
  {
    title: 'Welcome to Life 2.0',
    description: 'Moving to a new city or new country? Now immediately find like-minded people who will help you settle in!',
    image: require('./assets/Group78.png'),
    logo: require('./assets/LIFE2.0.png'),
    buttons: [
      { label: 'Next', action: 'next', type: 'primary' },
      { label: 'Skip', action: 'skip' },
    ],
  },
  {
    title: 'Introduce yourself to people in your city!',
    description: 'Setup your profile and connect with people with similar interests and backgrounds in your new city.',
    image: require('./assets/Group80.png'),
    logo: require('./assets/LIFE2.0.png'),
    buttons: [
      { label: 'Next', action: 'next', type: 'primary' },
      { label: 'Back', action: 'back' },
    ],
  },
  {
    title: 'Explore opportunities in your new city!',
    description: 'Life 2.0 will match you with communities, meetups & jobs in your new community. Offer help when you can, seek help when you need.',
    image: require('./assets/Group81.png'),
    logo: require('./assets/LIFE2.0.png'),
    buttons: [
      { label: 'Sign Up', action: 'signup', type: 'primary' },
      { label: 'Login', action: 'login' },
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
    top: '5%',
    left: '5%',
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
    height: 300,
    resizeMode: 'contain',
  },
  logo: {
    width: 150,
    height: 150,
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
    alignSelf: 'stretch'
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


const IntroSlides = ({ navigation }) => {
  const [currentScreen, setCurrentScreen] = useState(0);

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
      case 'signup':
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
          onPress={() => handleButtonPress('back')}
          icon="arrow-left"
        />
      )}
      <View style={styles.slide}>
        <Image source={slide.logo} style={styles.logo} />
        <View style={styles.imageContainer}>
          <Image source={slide.image} style={styles.image} />
        </View>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.description}>{slide.description}</Text>
        <View style={styles.buttonContainer}>
          {slide.buttons.map((button, buttonIndex) => (
            <Fragment key={buttonIndex}>
            {
              button.type === 'primary' 
              ? <PrimaryButton style={styles.button} onPress={() => handleButtonPress(button.action)}>{button.label}</PrimaryButton>
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
