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
    marginBottom: '5%', // 5% instead of 20px
  },
  image: {
    width: '80%', // 80% instead of 300px
    height: '80%', // 80% instead of 300px
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  fieldBox: {
    backgroundColor: 'white',
    marginBottom: '5%', // 5% instead of 10px
  },
  fieldLabel: {
    fontWeight: 'bold',
    color: 'black',
    marginBottom: '2%', // 2% instead of 8px
  },
  fieldValue: {
    paddingTop: '2%', // 2% instead of 8px
    borderWidth: 1,
    borderRadius: '5%', // 5% instead of 10px
    paddingHorizontal: '5%', // 5% instead of 12px
    backgroundColor: '#fff',
    height: '10%', // 10% instead of 40px
  },
  // Checkbox styles
  forgotPasswordLink: {
    alignItems: 'flex-end',
    marginTop: '5%', // 5% instead of 10px
  },
  forgotPasswordText: {
    color: '#717171',
    fontSize: '3%', // 3% instead of 12px
    fontWeight: 'bold',
  },
  signupLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '10%', // 10% instead of 80px
  },
  signupLinkText: {
    color: '#717171',
    fontSize: '3%', // 3% instead of 12px
    fontWeight: 'bold',
    marginLeft: '-15%', // -15% instead of -30px
    marginTop: '-30%', // -30% instead of -30px
  },
  signupLink: {
    color: 'black',
    fontSize: '3%', // 3% instead of 12px
    fontWeight: 'bold',
    marginLeft: '58%', // 58% instead of 58px
    marginTop: '-30%', // -30% instead of -30px
  },
  backButton: {
    position: 'absolute',
    top: '5%', // 5% instead of 20px
    left: '5%', // 5% instead of 20px
    zIndex: 1,
  },
  backButtonText: {
    color: 'black',
    fontSize: '4%', // 4% instead of 16px
  },
  loginButton: {
    backgroundColor: 'black',
    paddingVertical: '5%', // 5% instead of 10px
    borderRadius: '1%', // 1% instead of 5px
    marginBottom: '5%', // 5% instead of 20px
  },
  loginButtonText: {
    color: '#FFC003', // Change the text color to your desired color
    textAlign: 'center',
    fontSize: '4%', // 4% instead of 16px
    fontWeight: 'bold',
  },
  });


export default Login;
