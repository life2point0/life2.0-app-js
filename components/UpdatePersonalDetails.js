import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, ScrollView, KeyboardAvoidingView, StatusBar } from 'react-native'
import { ActivityIndicator, IconButton, useTheme } from 'react-native-paper'
import { USER_SERVICE_BASE_URL } from './constants'
import { useAuth } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { Form } from '../shared-components/form/Form'
import { updatePersonalDetailsFields } from './constants/fields/updatePersonalDetailsFields'

export default UpdatePersonalDetails = () => {
  
  const { authCall, profile, getProfile, isNewUser } = useAuth()
  const navigation = useNavigation()
  const theme = useTheme()

  const [errorText, setErrorText] = useState('')
  const [fields, setFields] = useState([])
  const [isProfileSubmitting, setProfileSubmitting] = useState(false)

  const fetchDataAndUpdateFields = async (url, fieldName) => {
    try {
      const response = (await authCall({
        method: 'GET',
        url: url
      }))?.data

      setFields((prevFields) => {
        const updatedFields = [...prevFields]
        const fieldToUpdate = updatedFields.find((field) => field.name === fieldName)

        if (fieldToUpdate) {
          fieldToUpdate.options = response.data
        }

        return updatedFields
      })
    } catch (error) {
      setErrorText(error.response?.data?.detail?.msg || 'Unknown Error')
    }
  }

  useEffect(() => {
    setFields(updatePersonalDetailsFields)

    const fetchData = async () => {
      await fetchDataAndUpdateFields(`${USER_SERVICE_BASE_URL}/skills?perPage=100`, 'skills')
      await fetchDataAndUpdateFields(`${USER_SERVICE_BASE_URL}/languages?perPage=100`, 'languages')
    }

    fetchData()
  }, [])

  const selectedSkills = profile?.skills?.map(skill => skill.id)
  const selectedLanguages = profile?.languages?.map(language => language.id)

  const UpdatePersonalDetailsInitialValues = {
    skills: selectedSkills || [],
    languages: selectedLanguages || []
  }

  const handleProfileSubmit = async (values) => {
    try {
      setProfileSubmitting(true)
      await authCall({
        method: 'PATCH',
        url: `${USER_SERVICE_BASE_URL}/users/me?${isNewUser ? 'notificationType=NEW_USER_JOINED' : ''}`,
        data: values
      })
      await getProfile()
      navigation.navigate('Main', { screen: 'Home' })
    } catch (e) {
      setErrorText(e?.response?.data?.detail?.msg || 'Unknown Error' )
    } finally {
      setProfileSubmitting(false)
    }
  }

  return (
    <SafeAreaView style={{flex: 1 }}>
      <StatusBar backgroundColor='#fbfbfb' barStyle="dark-content" />
      <KeyboardAvoidingView behavior="height">
        <View style={theme.spacing.onboarding.headerContainer}>
        { <Text style={theme.fonts.title}>Personal Details</Text> }
          <IconButton
            icon="arrow-left"
            style={theme.spacing.backButton}
            onPress={() => navigation.goBack()}
          />
       </View>
      <ScrollView style={theme.spacing.onboarding.container}>
      
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

      { !profile?.description && <Text style={theme.fonts.description}>
            These options will help us find the most relevant 
            communities and people for you
        </Text> 
      }

        { profile && fields?.length ? (
            <Form
              initialValues={UpdatePersonalDetailsInitialValues}
              fields={fields}
              onSubmit={handleProfileSubmit}
              isLoading={isProfileSubmitting}
              submitButtonText='Next'
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
