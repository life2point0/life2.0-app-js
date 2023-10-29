import React, { useReducer, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Button } from 'react-native';
import LoginIllustration from './assets/signup-illustration.png'; // Adjust the path as needed
import Checkbox from './checkbox'; // Import your Checkbox component
import { useAuth } from '../contexts/AuthContext';
import { Banner, IconButton, RadioButton } from 'react-native-paper';
import { PrimaryButton } from './PrimaryButton';
// TODO: Use yup and formik

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false); // For the checkbox
  const { login } = useAuth();
  const [errorText, setErrorText] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const passwordField = useRef();

  const handleLogin = async () => {
    try {
      setSubmitting(true)
      await login(email, password);
      navigation.navigate('Main', { screen: 'Home' })
    } catch (e) {
      setErrorText(e?.response?.data?.error_description || 'Unknown Error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <View>
        <Text style={styles.title}>Log In</Text>
        <IconButton
          icon="arrow-left"
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.description}>
          Log In if you already have a Life 2.0 profile, or else Register and build your profile
          </Text>
          <View style={styles.imageContainer}>
            <Image source={LoginIllustration} style={styles.image} />
          </View>
          <View style={styles.formContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center', paddingBottom: 20}}>
                <RadioButton status="checked" style={{flex: 1}}n></RadioButton>
                <Text style={{flex: 2}}>Email</Text>
                <RadioButton disabled style={{flex: 1}}></RadioButton>
                <Text style={{flex: 2}}>Phone</Text>
            </View> 
            {errorText && (
              <View style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <IconButton
                  icon="alert-circle"
                  iconColor='darkred'
                  size={20}
                />
                <Text style={{ color: 'darkred' }}>{errorText}</Text>
              </View>
            )}
            <View style={styles.fieldBox}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.fieldValue}
                placeholder="Email"
                placeholderTextColor="#E1E1E1"
                keyboardType="email-address"
                value={email}
                onChangeText={(text) => setEmail(text)}
                blurOnSubmit={false}
                returnKeyType="next"
                onSubmitEditing={() => passwordField.current.focus()}
              />
            </View>
            <View style={styles.fieldBox}>
              <Text style={styles.fieldLabel}>Password</Text>
              <TextInput
                style={styles.fieldValue}
                placeholder="Password"
                placeholderTextColor="#E1E1E1"
                secureTextEntry={true}
                value={password}
                onChangeText={(text) => setPassword(text)}
                ref={passwordField}
              />

              {/* Forgot Password Link */}
              <TouchableOpacity
                style={styles.forgotPasswordLink}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          <PrimaryButton
            disabled={isSubmitting}
            loading={isSubmitting}
            onPress={handleLogin}
            mode='contained'
            textColor='#FFC003'
          >
            <Text>Log In</Text>
          </PrimaryButton>
          <View style={styles.signupLinkContainer}>
            <Text style={styles.signupLinkText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={styles.signupLink}>Sign up</Text>
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
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
  },
  description: {
    color: '#717171',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 15,
    paddingTop: 20,
    flex: 1
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20
  },
  imageContainer: {
    alignItems: 'center',
    flex: 10
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 0.01,
    justifyContent: 'center'
  },
  fieldBox: {
    backgroundColor: 'white',
    marginBottom: '10%',
  },
  fieldLabel: {
    color: 'black',
    marginBottom: 8
  },
  fieldValue: {
    paddingTop: '8px',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    height: 40
  },
  // Checkbox styles
  forgotPasswordLink: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordText: {
    color: '#717171',
    fontSize: 12,
    fontWeight: 'bold',
  },
  signupLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 24
  },
  signupLinkText: {
    color: '#717171',
    fontSize: 14,
    fontWeight: 'bold',
  },
  signupLink: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  backButton: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: 1,
    borderColor: 'black',
  },
  backButtonText: {
    color: 'black',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: 'black',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default Login;