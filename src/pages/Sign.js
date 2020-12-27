import React, {useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import {authStyle} from './styles';
import {Input, Button} from '../components';
import auth from '@react-native-firebase/auth';

const Sign = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const sign = async () => {
    if (password === repeatPassword) {
      try {
        await auth().createUserWithEmailAndPassword(email, password);
        Alert.alert('ChatApp', 'User Registration Created');
        props.navigation.goBack();
      } catch (err) {
        Alert.alert('ChatApp', err.code);
      }
    } else {
      Alert.alert('ChatApp', 'Password did not match');
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
            <Text>Talk to Everyone</Text>
          </View>
          <View style={{flex: 1}}>
            <Input
              inputProps={{
                placeholder: 'Type your e-mail address',
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
            <Input
              inputProps={{
                placeholder: 'Type your password again',
                secureTextEntry: true,
              }}
              onType={(value) => setRepeatPassword(value)}
            />
            <Button title="Create account" onPress={sign} />
            <Button
              title="Cancel"
              noBorder
              onPress={() => props.navigation.goBack()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export {Sign};
