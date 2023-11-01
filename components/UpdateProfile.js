import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { ActivityIndicator, IconButton } from 'react-native-paper'
import { CORE_SERVICE_BASE_URL, USER_SERVICE_BASE_URL } from './constants'
import { useAuth } from '../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { Form } from '../shared-components/form/Form'
import { updateProfileFields, updateProfileSchema } from './constants/fields/updateProfileFields'
import { updateProfileStyles } from './constants/styles/updateProfileStyles'

export default UpdateProfile = () => {
  const [profile, setProfile] = useState(null)
  const [isProfileSubmitting, setProfileSubmitting] = useState(false)
  const { authCall, getProfile } = useAuth()
  const { navigate } = useNavigation()
  const [errorText, setErrorText] = useState('')
  const [fields, setFields] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getProfile()
        setProfile(profileData)
        
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
        setErrorText(error.response?.data?.detail?.msg)
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
    <View style={updateProfileStyles.container}>
      <Text style={updateProfileStyles.title}>Complete Profile</Text>
      <Text style={updateProfileStyles.subTitle}>
        Please complete your profile{'\n'}
        <Text style={updateProfileStyles.username}>
          {profile?.firstName} {profile?.lastName}
        </Text>
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
            styles={updateProfileStyles.form}
            onSubmit={handleProfileSubmit}
            isLoading={isProfileSubmitting}
          />
        ) : 
        (
          <ActivityIndicator style={{alignSelf: 'center'}} animating={true} color="black" />
        )
      }
    </View>
  )
}
