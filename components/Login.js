import React, { useState } from 'react'
import { View, Text, ScrollView, SafeAreaView, StatusBar, KeyboardAvoidingView, Image, TouchableOpacity } from 'react-native'
import { IconButton, useTheme } from 'react-native-paper'
import * as _ from 'lodash'
import { useAuth } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { Form } from '../shared-components/form/Form'
import { loginFields, loginSchema } from './constants/fields/loginFields'
import LoginIllustration from './assets/signup-illustration.png'
import { logInStyles } from './constants/styles/loginStyles'


const Login =  () => {
  const { login } = useAuth()
  const navigation = useNavigation()
  const theme = useTheme()
  const [isSubmitting, setSubmitting] = useState(false)
  const [errorText, setErrorText] = useState('')

  const loginInitialValues = {
    email: '',
    password: ''
  }

  const handleLoginSubmit = async (values) => {
    try {
      setSubmitting(true)
      await login(values.email, values.password);
      navigation.navigate('Main', { screen: 'Home' })
    } catch (e) {
      setErrorText(e?.response?.data?.error_description || 'Unknown Error');
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <SafeAreaView style={{ flex: 1}}>
      <StatusBar backgroundColor='#fbfbfb' barStyle="dark-content" />
      <KeyboardAvoidingView behavior="height">
        <View style={theme.spacing.onboarding.headerContainer}>
          <Text style={theme.fonts.title}>Log In</Text>
          <IconButton
            icon="arrow-left"
            style={theme.spacing.backButton}
            onPress={() => navigation.navigate('Main', { screen: 'Home' })}
          />
        </View>
        <ScrollView contentContainerStyle={{...theme.spacing.onboarding.container, minHeight: 'auto'}}>
            
          <Text style={{ ...theme.fonts.description, ...theme.spacing.onboarding.textContainer }}>
            Log In if you already have a Life 2.0 profile, or else Register and build your profile
          </Text>

            <Image source={LoginIllustration} style={theme.spacing.onboarding.image} />

          {errorText && (
            <View style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
              <IconButton
                icon="alert-circle"
                iconColor='darkred'
                size={20}
              />
              <Text style={{color: 'darkred'}}>{errorText}</Text>
            </View>
          )}
          <View style={{ width: '100%' }}>
            <Form
              initialValues={loginInitialValues}
              validationSchema={loginSchema}
              fields={loginFields}
              onSubmit={handleLoginSubmit}
              isLoading={isSubmitting}
              submitButtonText='Login'
              styles={logInStyles}
            />
          </View>

          <View style={theme.spacing.onboarding.loginLinkContainer} >
            <Text style={theme.fonts.description}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={theme.fonts.subtitle}>Sign up</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Login