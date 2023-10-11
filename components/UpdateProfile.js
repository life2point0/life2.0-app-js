import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Button, Chip } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { USER_SERVICE_BASE_URL } from './constants';
import { useAuth } from '../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';


const ProfileSchema = Yup.object().shape({
  description: Yup.string().required('Required'),
});

export default function App() {
  const [profile, setProfile] = useState(null);
  const [selectedOccupations, setSelectedOccupations] = useState([]);
  const [descriptionCharCount, setDescriptionCharCount] = useState(0);
  const { authCall, getProfile } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    getProfile().then(profile => setProfile(profile)).catch(() => null)
  }, []);

  const occupations = [
    'Tourist', 'Student', 'Entrepreneur', 'C-suite', 'Doctor', 'Lawyer', 'Entertainer',
    'Artist', 'Nurse', 'Tutor', 'Teacher', 'Chef', 'Baker', 'Engineer', 'Hairdresser',
    'Masseuse', 'Banker', 'Bartender', 'Handyman', 'Technician'
  ];

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, fontWeight: 'bold', padding: 20, textAlign: 'center'}}>Complete Profile</Text>
      {profile ? (
        <Formik
          initialValues={{
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
            description: '',
          }}
          validationSchema={ProfileSchema}
          onSubmit={async (values) => {
            await authCall({
                url: `${USER_SERVICE_BASE_URL}/users/me`,
                data: { description: values.description }
            });
            await getProfile().then(() => navigate('Main', {screen: 'Home'})).catch(() => null)
          }}
        >
        {({ handleChange, handleSubmit }) => (
          <ScrollView>
            <View style={styles.fieldContainer}>
              <Text>First Name</Text>
              <TextInput
                style={styles.input}
                value={profile.firstName}
                editable={false}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text>Last Name</Text>
              <TextInput
                style={styles.input}
                value={profile.lastName}
                editable={false}
              />
            </View>

            <View style={styles.fieldContainer}>
              <Text>Email</Text>
              <TextInput
                style={styles.input}
                value={profile.email}
                editable={false}
              />
            </View>

            <View style={styles.chipContainer}>
              <View style={{width: '100%'}}>
                <Text>What I do for a living?</Text>
              </View>
              {occupations.map((occupation) => (
                <Chip
                  key={occupation}
                  selected={selectedOccupations.includes(occupation)}
                  onPress={() => {
                    setSelectedOccupations(prevState => {
                      if (prevState.includes(occupation)) {
                        return prevState.filter(o => o !== occupation);
                      } else {
                        return [...prevState, occupation];
                      }
                    });
                  }}
                >
                  {occupation}
                </Chip>
              ))}
            </View>

            <View style={styles.fieldContainer}>
                <Text>Bio</Text>
                <TextInput
                style={styles.inputMultiline}
                placeholder="Anything about you"
                multiline={true}
                maxLength={600}
                onChangeText={text => {
                    handleChange('description')(text);
                    setDescriptionCharCount(text.length);
                }}
                value={profile.description}
                />
                <Text style={styles.charCount}>{600 - descriptionCharCount} chars left</Text>
            </View>

            <Button mode="contained" onPress={handleSubmit}>
              Submit
            </Button>
          </ScrollView>
        )}
        </Formik>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
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

    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 20,
      gap: 8,
    },
    inputMultiline: {
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
});
