// React and React Native core modules
import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, TextInput } from 'react-native';

// External Libraries
import axios from 'axios';
import * as Yup from 'yup';
import { TextInput as PaperTextInput, Button, Checkbox as PaperCheckbox, IconButton } from 'react-native-paper';

// Local modules
import SignupIllustration from './assets/signup-illustration.png';  // Adjust the path as needed
import { USER_SERVICE_BASE_URL } from './constants';
import * as _ from 'lodash';
import { useAuth } from '../contexts/AuthContext';
import { PrimaryButton } from './PrimaryButton';
import { useNavigation } from '@react-navigation/native';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(8, 'Password should be at least 8 characters').required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  terms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required')
});

const Signup =  () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const navigation = useNavigation();
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const [errorText, setErrorText] = useState('');
  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
    validateForm();
  };
  const lastNameField = useRef();
  const emailField = useRef();
  const passwordField = useRef();
  const confirmPasswordField = useRef();

  const validateForm = () => {
    let hasError = false;
    try {
      validationSchema.validateSync(form, { abortEarly: false });
      setErrors({});
    } catch (e) {
      const newErrors = {};
      if (e.inner) {
        e.inner.forEach((error) => {
          newErrors[error.path] = error.message;
          hasError = true;
        });
      }
      setErrors(newErrors);
    }
    return !hasError;
  };

  const handleSubmit = async () => {
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });
    if (!validateForm()) {
      return;
    }
    try {
      setSubmitting(true)
      const response = await axios.post(`${USER_SERVICE_BASE_URL}/users/signup`, _.omit(form, ['confirmPassword', 'terms']));
      await login(form.email, form.password);
      navigation.replace('UpdateProfile');
    } catch (e) {
      setErrorText(e?.response?.data?.detail?.msg || "Unknown Error");
      console.log(e?.response?.data)
    } finally {
      setSubmitting(false)
    }
  };
  

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View>
        <Text style={styles.title}>Sign Up</Text>
        <IconButton
          icon="arrow-left"
          style={styles.backButton}
          onPress={() => navigation.navigate('Main', { screen: 'Home' })}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.description}>
          Create a profile in minutes and you will then
          be matched with communities and
          opportunities relevant to you.
        </Text>

        <View style={styles.imageContainer}>
          <Image source={SignupIllustration} style={styles.image} />
        </View>
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
      <View style={{...styles.container, paddingTop: 10}}>

        <View style={styles.inputContainer}>
          <Text>First Name</Text>
          <TextInput
            placeholder="eg. John"
            style={styles.textInput}
            value={form.firstName}
            onChangeText={(value) => setForm({ ...form, firstName: value })}
            returnKeyType="next"
            onBlur={() => handleBlur('firstName')}
            blurOnSubmit={false}
            onSubmitEditing={() => lastNameField.current.focus() }
          />
          {touched.firstName && errors.firstName && <Text style={styles.errorText}>{errors.firstName}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text>Last Name</Text>
          <TextInput
            ref={lastNameField}
            placeholder="eg. Smith"
            style={styles.textInput}
            value={form.lastName}
            onChangeText={(value) => setForm({ ...form, lastName: value })}
            returnKeyType="next"
            onBlur={() => handleBlur('lastName')}
            blurOnSubmit={false}
            onSubmitEditing={() => emailField.current.focus() }
          />
          {touched.lastName && errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text>Email</Text>
          <TextInput
            ref={emailField}
            placeholder="john@example.com"
            style={styles.textInput}
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
            returnKeyType="next"
            onBlur={() => handleBlur('email')}
            blurOnSubmit={false}
            onSubmitEditing={() => passwordField.current.focus() }
          />
          {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text>Password</Text>
          <TextInput
            ref={passwordField}
            placeholder="Password"
            style={styles.textInput}
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            onBlur={() => handleBlur('password')}
            blurOnSubmit={false}
            returnKeyType="next"
            secureTextEntry
            onSubmitEditing={() => confirmPasswordField.current.focus() }
          />
          {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <Text>Confirm Password</Text>
          <TextInput
            placeholder="Confirm Password"
            ref={confirmPasswordField}
            style={styles.textInput}
            value={form.confirmPassword}
            onChangeText={(value) => setForm({ ...form, confirmPassword: value })}
            onBlur={() => handleBlur('confirmPassword')}
            secureTextEntry
          />
          {touched.confirmPassword && errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
        </View>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
            <PaperCheckbox
              status={form.terms ? 'checked' : 'unchecked'}
              onPress={() => setForm({ ...form, terms: !form.terms })}
            />
            <Text>I agree to Terms and Conditions</Text>
          </View>
          {touched.terms && errors.terms && <Text>{errors.terms}</Text>}
        </View>
        <View>
          <PrimaryButton mode="contained" textColor='#FFC003' onPress={handleSubmit} loading={isSubmitting} disabled={isSubmitting}>
            Sign Up
          </PrimaryButton>
        </View>
        <View style={styles.loginLinkContainer}>
          <Text style={styles.loginLinkText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>

      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  backButtonText: {
    color: 'black',
    fontSize: 12,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
  description: {
    color: '#717171',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingTop: 20
  },
  formContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fieldBox: {
    backgroundColor: 'white',
    marginBottom: 10,
    paddingTop: -20
  },
  fieldLabel: {
    fontWeight: 'bold',
    color: 'black',
  },
  fieldValue: {
    backgroundColor: '#FFF',
    borderColor: '#D1D1D1',
    borderWidth: 1,
    borderRadius: 5,
    color: '#888',
    fontSize: 12,
    fontStyle: 'normal',
    fontWeight: '400',
  },
  signUpButton: {
    backgroundColor: 'black',
    paddingVertical: 20,
    borderRadius: 2,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#FFC003',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 24
  },
  loginLinkText: {
    color: '#717171',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginLink: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  termsTextContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  termsText: {
    color: '#717171',
    fontSize: 12,
  },
  boldText: {
    color: '#717171',
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center', 
  },
  image: {
    width: 200, 
    height: 200, 
    resizeMode: 'contain', 
  },
  textInput: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    height: 40
  },
  errorText: {
    color: 'red'
  },
  inputContainer: {
    padding: 10
  }
});


export default Signup;
