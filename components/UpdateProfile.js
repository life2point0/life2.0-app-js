import React, { useState, useEffect } from 'react'
import { View, Text, StatusBar, SafeAreaView, ScrollView, KeyboardAvoidingView } from 'react-native'
import { ActivityIndicator, IconButton, useTheme } from 'react-native-paper'
import { CORE_SERVICE_BASE_URL, USER_SERVICE_BASE_URL } from './constants'
import { useAuth } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { Form } from '../shared-components/form/Form'
import { updateProfileFields, updateProfileSchema } from './constants/fields/updateProfileFields'
import { updateProfileStyles } from './constants/styles/updateProfileStyles'

export default UpdateProfile = () => {
  
  const { authCall, profile, isProfileCreated, getProfile } = useAuth()
  const navigation = useNavigation()
  const theme = useTheme()

  const [errorText, setErrorText] = useState('')
  const [fields, setFields] = useState([])
  const [isProfileSubmitting, setProfileSubmitting] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = (await authCall({
          method: 'GET',
          url: `${USER_SERVICE_BASE_URL}/occupations`
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
    if(isProfileCreated) {
      updateProfileFields[0].hidden = false
      updateProfileFields[1].hidden = false
    } else {
      updateProfileFields[0].hidden = true
      updateProfileFields[1].hidden = true
    }
  }, [])

  const selectedOccupations = profile?.occupations.map(occupation => occupation.id)
  const preSelectedPastLocations = profile?.pastLocations.map(location =>  ( {place_id: location.googlePlaceId, name: location.name}))
  const preselectedPlaceOfOrigin = {place_id: profile?.placeOfOrigin?.googlePlaceId, name: profile?.placeOfOrigin?.name}
  const preselectedCurrentPlace = {place_id: profile?.currentPlace?.googlePlaceId, name: profile?.currentPlace?.name}

  const updateProfileInitialValues = {
    firstName: profile?.firstName || '',
    lastName: profile?.lastName || '',
    email: profile?.email || '',
    placeOfOrigin: preselectedPlaceOfOrigin || '',
    pastLocations: preSelectedPastLocations || [],
    currentPlace: preselectedCurrentPlace || '',
    description: profile?.description || '',
    occupations: selectedOccupations || []
  }

  const handleProfileSubmit = async (values) => {
    try {
      setProfileSubmitting(true)
      await authCall({
        method: 'PATCH',
        url: `${USER_SERVICE_BASE_URL}/users/me`,
        data: values
      })
      await getProfile()
      navigation.replace('ProfileImageUpload')
    } catch (e) {
      setErrorText(e?.response?.data?.detail?.msg || 'Unknown Error' )
    } finally {
      setProfileSubmitting(false)
    }
  }

  return (
    <SafeAreaView style={{flex: 1 }}>
      <KeyboardAvoidingView behavior="height">
        <View style={theme.spacing.onboarding.headerContainer}>
        { !isProfileCreated && <Text style={theme.fonts.title}>Complete Profile</Text> }
        { isProfileCreated && <Text style={theme.fonts.title}>Update Profile</Text> }
          <IconButton
            icon="arrow-left"
            style={theme.spacing.backButton}
            onPress={() => navigation.navigate('Main', { screen: 'Home' })}
          />
       </View>
      <ScrollView contentContainerStyle={theme.spacing.onboarding.container}>
      
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

      { !isProfileCreated && <Text style={theme.fonts.description}>
          Welcome onboard {profile?.firstName}! {"\n"}
          Please complete your profile.
        </Text> 
      }

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
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
