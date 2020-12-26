import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth'

import {Login, Sign, Timeline} from './pages';

const Stack = createStackNavigator();
function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={auth().currentUser ? "Timeline" : "Login"} screenOptions={{headerShown:false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign" component={Sign} />
        <Stack.Screen name="Timeline" component={Timeline} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
