import React, { useState } from 'react'
import { View, Image, StyleSheet, SafeAreaView } from 'react-native'
import { IconButton, Text, useTheme } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Button from '../shared-components/button/Button'

const slides = [
  {
    subtitle: 'Welcome to Life!',
    description: 'Moving to a new city or new country? Now immediately find like-minded people who will help you settle in!',
    image: require('./assets/intro-1.png'),
    logo: require('./assets/logo.png'),
    buttons: [
      { label: 'Skip Introduction', action: 'skip' },
      { label: 'Next', action: 'next', type: 'primary' }
    ],
  },
  {
    subtitle: 'Introduce yourself to people in your city!',
    description: 'Setup your profile and connect with people with similar interests and backgrounds in your new city.',
    image: require('./assets/intro-2.png'),
    logo: require('./assets/logo.png'),
    buttons: [
      { label: 'Skip Introduction', action: 'skip' },
      { label: 'Next', action: 'next', type: 'primary' }
    ],
  },
  {
    subtitle: 'Explore opportunities in your new city!',
    description: 'Life 2.0 will match you with communities, meetups & jobs in your new community. Offer help when you can, seek help when you need.',
    image: require('./assets/intro-3.png'),
    logo: require('./assets/logo.png'),
    buttons: [
      { label: 'Start Exploring', action: 'home', type: 'primary' },
    ],
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  slide: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    padding: 20,
    gap: 20,
    height: '100%'
  },
  contentContainer: {
    width: '80%',
    gap: 10
  },
  buttonContainer: {
    width: '100%',
    gap: 10
  }
})


const IntroSlides = () => {
  const [currentScreen, setCurrentScreen] = useState(0)
  const navigation = useNavigation()
  const theme = useTheme()

  const handleButtonPress = (action) => {
    switch (action) {
      case 'next':
        if (currentScreen < slides.length - 1) {
          setCurrentScreen(currentScreen + 1)
        }
        break
      case 'skip':
        setCurrentScreen(2)
        break
      case 'back':
        if (currentScreen > 0) {
          setCurrentScreen(currentScreen - 1)
        }
        break
      case 'login':
        navigation.navigate('Login')
        break
      case 'home':
        navigation.navigate('Main', { screen: 'Home' })
        break
      default:
        break
    }
  }

  const slide = slides[currentScreen]

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.slide}>
      {currentScreen > 0 && (
        <IconButton
          style={styles.backButton}
          onPress={() => handleButtonPress('back')}
          icon="arrow-left"
        />
      )}
        <Image source={slide.logo} style={theme.spacing.logo}/>
        <Image source={slide.image} style={styles.image} resizeMode="contain" />
        <View style={styles.contentContainer}>
          <Text style={{...theme.fonts.subtitle, textAlign: 'center'}}>{slide.subtitle}</Text>
          <Text style={{...theme.fonts.description, textAlign: 'center'}}>{slide.description}</Text>
        </View>
        <View style={styles.buttonContainer}>
          {slide.buttons.map((button, buttonIndex) => (
            <Button key={buttonIndex} mode={ button.type === 'primary' ? 'contained' : 'outlined'} onPress={() => handleButtonPress(button.action)}>{button.label}</Button>  
          ))}
        </View>
      </View>
    </SafeAreaView>
  )
}
export default IntroSlides
