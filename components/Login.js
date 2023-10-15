import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Button } from 'react-native';
import YourImage from './assets/Group85.png'; // Adjust the path as needed
import Checkbox from './checkbox'; // Import your Checkbox component
import { useAuth } from '../contexts/AuthContext';
import { Banner, IconButton, Snackbar } from 'react-native-paper';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false); // For the checkbox
  const { login } = useAuth();
  const [errorText, setErrorText] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      navigation.navigate('Main', { screen: 'Home' })
    } catch (e) {
      setErrorText(e?.response?.data?.error_description || 'Unknown Error');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="height">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
            <Text style={styles.title}>Log In</Text>
              <View style={styles.imageContainer}>
                <Image source={YourImage} style={styles.image} />
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
                <View style={styles.formContainer}>
                  <View style={styles.fieldBox}>
                    <Text style={styles.fieldLabel}>Email</Text>
                      <TextInput
                        style={styles.fieldValue}
                        placeholder="Email"
                        placeholderTextColor="#E1E1E1"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
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
                      />

                      {/* Forgot Password Link */}
                      <TouchableOpacity
                         style={styles.forgotPasswordLink}
                         onPress={() => navigation.navigate('ForgotPassword')}
                      >
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                      </TouchableOpacity>
                  </View>

            {/* Checkbox for "Terms and Conditions" */}
            </View>

            <TouchableOpacity
             style={styles.loginButton}
              onPress={handleLogin}>
              <Text style={styles.loginButtonText}>Log In</Text>
            </TouchableOpacity>
          <View style={styles.signupLinkContainer}>
            <Text style={styles.signupLinkText}>Not a member?</Text>
          </View>
            <View>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <Text style={styles.signupLink}>Sign Up</Text>
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
    paddingHorizontal: '5%',
    paddingTop: '10%',
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: '5%',
  },
  image: {
    width: '80%', 
    height: '80%', 
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fieldBox: {
    backgroundColor: 'white',
    marginBottom: '5%', 
  },
  fieldLabel: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '2%', 
  },
  fieldValue: {
    paddingTop: '8px', 
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12, 
    backgroundColor: '#fff',
    height: '10%',
  },
  // Checkbox styles
  forgotPasswordLink: {
    alignItems: 'flex-end',
    marginTop: '5%', 
  },
  forgotPasswordText: {
    color: '#717171',
    fontSize: 12,
    fontWeight: 'bold',
  },
  signupLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%',
  },
  signupLinkText: {
    color: '#717171',
    fontSize: 12, 
    fontWeight: 'bold',
    marginLeft: '-15%', 
    marginTop: '-30%', 
  },
  signupLink: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: '58%', 
    marginTop: '-30%', 
  },
  backButton: {
    position: 'absolute',
    top: '5%', 
    left: '5%',
    zIndex: 1,
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
  loginButtonText: {
    color: '#FFC003', 
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  });


export default Login;
