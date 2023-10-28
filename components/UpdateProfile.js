import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import { USER_SERVICE_BASE_URL } from './constants';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Form } from '../shared-components/form/Form'
import { updateProfileFields, updateProfileSchema } from './constants/fields/updateProfileFields';
import { updateProfileStyles } from './constants/styles/updateProfileStyles';


// const occupations = [
//   'Tourist', 'Student', 'Entrepreneur', 'C-suite', 'Doctor', 'Lawyer', 'Entertainer',
//   'Artist', 'Nurse', 'Tutor', 'Teacher', 'Chef', 'Baker', 'Engineer', 'Hairdresser',
//   'Masseuse', 'Banker', 'Bartender', 'Handyman', 'Technician'
// ]

export default UpdateProfile = () => {
  const [profile, setProfile] = useState(null)
  const [isProfileSubmitting, setProfileSubmitting] = useState(false)
  // const [selectedOccupations, setSelectedOccupations] = useState([]);
  // const [descriptionCharCount, setDescriptionCharCount] = useState(0);
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
    console.log('VALUES', values)
    const profileData = {
      ...values
      // occupations: selectedOccupations
    }
    console.log("DATA", profileData)
    try {
      setProfileSubmitting(true);
      await authCall({
        method: 'PUT',
        url: `${USER_SERVICE_BASE_URL}/users/me`,
        data: profileData
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

  // const handleChipSelection = (chip) => {
  //   setSelectedOccupations((prevState) => {
  //     if (prevState.includes(chip)) {
  //       return prevState.filter((o) => o !== chip);
  //     } else {
  //       return [...prevState, chip];
  //     }
  //   });
  // }

  // const updateCharCount = (field, value) => {
  //   setDescriptionCharCount(value)
  // }

  return (
    <View style={updateProfileStyles.container}>
      <Text style={updateProfileStyles.title}>Complete Profile</Text>
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
            // onChipClick={handleChipSelection}
            // updateCharCount={updateCharCount}
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
