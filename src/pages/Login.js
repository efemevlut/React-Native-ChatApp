import React, {useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  Alert,
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import {authStyle} from './styles';
import {Input, Button} from '../components';
import auth from '@react-native-firebase/auth';
import {resolveAuthError} from '../functions';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      if (email === '' || password === '') {
        Alert.alert('ChatApp', 'Auth null value');
      } else {
        await auth().signInWithEmailAndPassword(email, password);
        Alert.alert("ChatApp", "Login Successfull")
        props.navigation.navigate("Timeline")
      }
    } catch (error) {
      Alert.alert('ChatApp', resolveAuthError(err.code));
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView style={{flex: 1, backgroundColor: '#cfd8dc'}}>
        <ScrollView contentContainerStyle={{flex: 1}}>
          <View style={authStyle.container}>
            <Image
              style={authStyle.logo}
              source={require('../assets/chatLogo.png')}
            />
            <Text style={authStyle.logoText}>Talk to Everyone</Text>
          </View>
          <View style={{flex: 1}}>
            <Input
              inputProps={{
                placeholder: 'Type your email address',
                keyboardType: 'email-address',
              }}
              onType={(value) => setEmail(value)}
            />
            <Input
              inputProps={{
                placeholder: 'Type your password',
                secureTextEntry: true,
              }}
              onType={(value) => setPassword(value)}
            />
            <Button title="Sign In" onPress={() => login()} />
            <Button
              title="Sign Up"
              noBorder
              onPress={() => props.navigation.navigate('Sign')}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export {Login};
