import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import { USER_SERVICE_BASE_URL } from './constants';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Form } from '../shared-components/form/Form'
import { updateProfileFields, updateProfileSchema } from './constants/fields/updateProfileFields';
import { updateProfileStyles } from './constants/styles/updateProfileStyles';

export default UpdateProfile = () => {
  const [profile, setProfile] = useState(null)
  const [isProfileSubmitting, setProfileSubmitting] = useState(false)
  const { authCall, getProfile } = useAuth()
  const { navigate } = useNavigation()
  const [errorText, setErrorText] = useState('')

  useEffect(() => {
    getProfile().then(profile => setProfile(profile)).catch(() => null)
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
      setProfileSubmitting(true);
      await authCall({
        method: 'PUT',
        url: `${USER_SERVICE_BASE_URL}/users/me`,
        data: values
      });
      await getProfile();
      navigate('Main', { screen: 'Home' });
    } catch (e) {
      setErrorText(e?.response?.data?.detail?.msg || 'Unknown Error' );
      console.log('API ERROR', e?.response?.data?.detail)
    } finally {
      setProfileSubmitting(false);
    }
  }

  return (
    <View style={updateProfileStyles.container}>
      <Text style={updateProfileStyles.title}>Complete Profile</Text>
      <Text style={updateProfileStyles.subTitle}>
        Please complete your profile{'\n'}
        <Text style={updateProfileStyles.subTitle.name}>
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
      { profile ? (
          <Form
            initialValues={updateProfileInitialValues}
            validationSchema={updateProfileSchema}
            fields={updateProfileFields}
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
