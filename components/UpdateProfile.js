import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, SafeAreaView, ScrollView } from 'react-native'
import { ActivityIndicator, IconButton, useTheme } from 'react-native-paper'
import { CORE_SERVICE_BASE_URL, USER_SERVICE_BASE_URL } from './constants'
import { useAuth } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { Form } from '../shared-components/form/Form'
import { updateProfileFields, updateProfileSchema } from './constants/fields/updateProfileFields'
import { updateProfileStyles } from './constants/styles/updateProfileStyles'

export default UpdateProfile = () => {
  
  const { authCall, profile, getProfile } = useAuth()
  const { navigate } = useNavigation()
  const theme = useTheme()

  const [errorText, setErrorText] = useState('')
  const [fields, setFields] = useState([])
  const [isProfileSubmitting, setProfileSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await authCall({
          method: 'GET',
          url: `${CORE_SERVICE_BASE_URL}/occupations`
        }))?.data

        const profileFields = updateProfileFields
        const occupationsField = profileFields.find(field => field.name === 'occupations')
        if (occupationsField) {
          occupationsField.options = response.data
        }
        setFields(profileFields)
      } catch (error) {
        setErrorText(error.response?.data?.detail?.msg || 'Unknown Error')
      }
    }
    fetchData()
  }, [])


  const updateProfileInitialValues = {
    firstName: profile?.firstName,
    lastName: profile?.lastName,
    email: profile?.email,
    description: '',
    occupations: []
  }

  const handleProfileSubmit = async (values) => {
    try {
      setProfileSubmitting(true)
      await authCall({
        method: 'PUT',
        url: `${USER_SERVICE_BASE_URL}/users/me`,
        data: values
      })
      await getProfile()
      navigate('Main', { screen: 'Home' })
    } catch (e) {
      setErrorText(e?.response?.data?.detail?.msg || 'Unknown Error' )
    } finally {
      setProfileSubmitting(false)
    }
  }

  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <ScrollView contentContainerStyle={theme.spacing.onboarding.container}>
        
      <View style={theme.spacing.onboarding.headerContainer}>
          <Text style={theme.fonts.title}>Complete Profile</Text>
          <IconButton
            icon="arrow-left"
            style={theme.spacing.backButton}
            onPress={() => navigate('Main', { screen: 'Home' })}
          />
       </View>
      
      <Text style={theme.fonts.description}>
        Welcome onboard {profile?.firstName}! {"\n"}
        Please complete your profile.
      </Text>

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
        { profile && fields.length ? (
            <Form
              initialValues={updateProfileInitialValues}
              validationSchema={updateProfileSchema}
              fields={fields}
              onSubmit={handleProfileSubmit}
              isLoading={isProfileSubmitting}
              submitButtonText='Create Profile'
            />
          ) : 
          (
            <ActivityIndicator style={{alignSelf: 'center'}} animating={true} color="black" />
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
}
