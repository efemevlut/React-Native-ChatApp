import React, {useEffect, useState, createContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';

import {Login, Sign, Timeline} from './pages';

export const ModalContext = createContext();

const Stack = createStackNavigator();

function Router() {
  const [topicModalFlag, setTopicModalFlag] = useState(true);
  const [isLogged, setLogged] = useState(false);

  const setModalFunc = (bool) => setTopicModalFlag(bool);

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setLogged(user);
    });
  }, []);

  return (
    <ModalContext.Provider value={{setModalFunc, topicModalFlag}}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {isLogged ? (
            <Stack.Screen name="Timeline" component={Timeline} />
          ) : (
            <>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Sign" component={Sign} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ModalContext.Provider>
  );
}

export default Router;
