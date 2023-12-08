import React, { useState } from 'react'
import { View, Text, Image, ScrollView, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native'
import axios from 'axios'
import { IconButton, useTheme } from 'react-native-paper'
import SignupIllustration from './assets/signup-illustration.png'
import { USER_SERVICE_BASE_URL } from './constants'
import * as _ from 'lodash'
import { useAuth } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { Form } from '../shared-components/form/Form'
import { signUpFields, signUpSchema } from './constants/fields/signUpFields'
import { signUpStyles } from './constants/styles/signUpStyles'


const Signup =  () => {
  const { login } = useAuth()
  const navigation = useNavigation()
  const theme = useTheme()
  const [isSubmitting, setSubmitting] = useState(false)
  const [errorText, setErrorText] = useState('')

  const signUpInitialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  }

  const handleSignUpSubmit = async (values) => {
    try {
      setSubmitting(true)
      values.firstName = capitalizeName(values.firstName)
      values.lastName = capitalizeName(values.lastName)
      await axios.post(`${USER_SERVICE_BASE_URL}/users/signup`, _.omit(values, ['confirmPassword', 'terms']))
      await login(values.email, values.password)
      navigation.replace('UpdateProfile')
    } catch (e) {
      setErrorText(e?.response?.data?.detail?.msg || "Unknown Error")
    } finally {
      setSubmitting(false)
    }
  }

  const capitalizeName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }
  
  return (
    <SafeAreaView style={{ flex: 1}}>
      <StatusBar backgroundColor='#fbfbfb' barStyle="dark-content" />
      <KeyboardAvoidingView behavior="height">
        <View style={theme.spacing.onboarding.headerContainer}>
            <Text style={theme.fonts.title}>Sign Up</Text>
            <IconButton
              icon="arrow-left"
              style={theme.spacing.backButton}
              onPress={() => navigation.navigate('Main', { screen: 'Home' })}
            />
        </View>
        <ScrollView contentContainerStyle={theme.spacing.onboarding.container}>            
          <Text style={{ ...theme.fonts.description, ...theme.spacing.onboarding.textContainer }}>
            Create a profile in minutes and you will then
            be matched with communities and
            opportunities relevant to you.
          </Text>

          <Image source={SignupIllustration} style={theme.spacing.onboarding.image} />

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
              initialValues={signUpInitialValues}
              validationSchema={signUpSchema}
              fields={signUpFields}
              onSubmit={handleSignUpSubmit}
              isLoading={isSubmitting}
              submitButtonText='Sign Up'
              styles={signUpStyles}
            />
          </View>

        <View style={theme.spacing.onboarding.loginLinkContainer} >
            <Text style={theme.fonts.description}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={theme.fonts.subtitle}>Login</Text>
            </TouchableOpacity>
        </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Signup
