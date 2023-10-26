import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ActivityIndicator, IconButton } from 'react-native-paper';
import * as Yup from 'yup';
import { USER_SERVICE_BASE_URL } from './constants';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { Form } from '../shared-components/form/Form'


const profileSchema = Yup.object().shape({
  description: Yup.string().required('Required')
})

const occupations = [
  'Tourist', 'Student', 'Entrepreneur', 'C-suite', 'Doctor', 'Lawyer', 'Entertainer',
  'Artist', 'Nurse', 'Tutor', 'Teacher', 'Chef', 'Baker', 'Engineer', 'Hairdresser',
  'Masseuse', 'Banker', 'Bartender', 'Handyman', 'Technician'
]

export default UpdateProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isProfileSubmitting, setProfileSubmitting] = useState(false);
  const [selectedOccupations, setSelectedOccupations] = useState([]);
  const [descriptionCharCount, setDescriptionCharCount] = useState(0);
  const { authCall, getProfile } = useAuth();
  const { navigate } = useNavigation();
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    getProfile().then(profile => setProfile(profile)).catch(() => null)
  }, []);
  

  const fields = [
    {
      name: 'firstName',
      label: 'First Name',
      placeholder: 'First Name',
      type: 'text'
    },
    {
      name: 'lastName',
      label: 'Last Name',
      placeholder: 'Last Name',
      type: 'text'
    },
    {
      name: 'email',
      label: 'Email',
      placeholder: 'Email',
      type: 'text'
    },
    {
      name: 'placeOfOrigin',
      label: 'Where am I from',
      type: 'location',
      placeholder: 'Select where you are from'
    },
    {
      name: 'pastLocations',
      label: 'Places I have lived in',
      type: 'location',
      multiple: true,
      placeholder: 'Select where you have been'
    },
    {
      name: 'currentLocation',
      label: 'Where am I now',
      placeholder: 'Select where you are now',
      type: 'location'
    },
    {
      name: 'occupations',
      label: 'What I do for a living?',
      type: 'chip',
      selectedChips: selectedOccupations,
      options: occupations
    },
    {
      name: 'description',
      label: 'Bio',
      placeholder: 'Anything about you',
      type: 'textarea',
      maxCharCount: 600,
      charCount: descriptionCharCount
    }
  ];

  const initialValues = {
    firstName: profile?.firstName,
    lastName: profile?.lastName,
    email: profile?.email,
    description: '',
  }


  const handleProfileSubmit = async (values) => {
    const profileData = {
      ...values,
      occupations: selectedOccupations
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
  };

  const handleChipSelection = (chip) => {
    setSelectedOccupations((prevState) => {
      if (prevState.includes(chip)) {
        return prevState.filter((o) => o !== chip);
      } else {
        return [...prevState, chip];
      }
    });
  }

  const updateCharCount = (field, value) => {
    setDescriptionCharCount(value)
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, fontWeight: 'bold', padding: 20, textAlign: 'center'}}>Complete Profile</Text>
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
      {profile ? (
        <Form
          initialValues={initialValues}
          validationSchema={profileSchema}
          fields={fields}
          onSubmit={handleProfileSubmit}
          onChipClick={handleChipSelection}
          updateCharCount={updateCharCount}
          isLoading={isProfileSubmitting}
          styles={styles}
        />
      ) : (
        <ActivityIndicator style={{alignSelf: 'center'}} animating={true} color="black" />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    fieldContainer: {
      marginBottom: 20,
    },
    input: {
      height: 40,
      borderColor: 'black',
      borderRadius: 2,
      borderWidth: 1,
      marginTop: 5,
      paddingHorizontal: 10,
      borderRadius: 10,
      justifyContent: 'center'
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
      gap: 8,
    },
    textarea: {
      height: 100,
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 5,
      padding: 10,
      textAlignVertical: 'top',
      borderColor: 'black',
      borderRadius: 10,
      borderWidth: 1,
    },
    charCount: {
      textAlign: 'right',
      fontSize: 12,
    },
    errorText: {
      color: 'red',
    },
});
