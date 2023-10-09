import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, Button } from 'react-native';
import YourImage from './assets/Group85.png'; // Adjust the path as needed
import Checkbox from './checkbox'; // Import your Checkbox component

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false); // For the checkbox

  const handleLogin = () => {
    // Implement your login logic here
    // You can check email and password, make API calls, etc.
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
                <View style={styles.formContainer}>
                  <View style={styles.fieldBox}>
                    <Text style={styles.fieldLabel}>Email:</Text>
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
                    <Text style={styles.fieldLabel}>Password:</Text>
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
              <Checkbox
              label="I agree with the Terms of Use of Life 2.0 and accept the privacy policy"
              isChecked={isChecked}
              onToggle={() => setIsChecked(!isChecked)}
              />
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
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  fieldBox: {
    backgroundColor: 'white',
    marginBottom: '10%',
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
    marginTop: 80,
  },
  signupLinkText: {
    color: '#717171',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: '-15%',
    marginTop: '-30%'
  },
  signupLink: {
    color: 'black',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: '58%',
    marginTop: '-30%'
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
    color: '#FFC003', // Change the text color to your desired color
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
