import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput } from 'react-native';
import { Button, Chip, Text } from 'react-native-paper';
import { Formik, useFormikContext } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { USER_SERVICE_BASE_URL } from './constants';

// Validation Schema
const validationSchema = Yup.object().shape({
  description: Yup.string().required('Description is required'),
});

const UserProfileScreen = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch the profile
    axios.get(`${USER_SERVICE_BASE_URL}/users/me`)
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = (values) => {
    const payload = {
      // transform your values here before sending
    };

    axios.put(`${USER_SERVICE_BASE_URL}/users/me`, payload)
      .then((response) => {
        // Handle success
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <ScrollView>
      <Formik
        initialValues={{
          firstName: profile?.firstName || '',
          lastName: profile?.lastName || '',
          email: profile?.email || '',
          description: '',
          // other fields
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, errors }) => (
          <View>
            <TextInput
              label="First Name"
              value={profile?.firstName}
              editable={false}
            />
            
            <TextInput
              label="Last Name"
              value={profile?.lastName}
              editable={false}
            />
            
            <TextInput
              label="Email"
              value={profile?.email}
              editable={false}
            />

            <TextInput
              label="Description"
              placeholder="Description"
            />
            {errors.description && <Text style={{color: 'red'}}>{errors.description}</Text>}

            <TextInput
              label="Place of Origin"
              placeholder="Place of Origin"
            />

            <TextInput
              label="Current Location"
              placeholder="Current Location"
            />

            <View>
              <Chip onPress={() => {}}>Tourist</Chip>
              <Chip onPress={() => {}}>Student</Chip>
              {/* More Chips for other occupations */}
            </View>

            <Button onPress={handleSubmit}>
              Submit
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default UserProfileScreen;
