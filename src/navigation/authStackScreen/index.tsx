import React from 'react';

import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "../../screens/logInScreen";
import SignUpScreen from "../../screens/signUpScreen";

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator initialRouteName='Login'>
      <AuthStack.Screen
        name='LogIn'
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <AuthStack.Screen name='SignUp' component={SignUpScreen} />
    </AuthStack.Navigator>
  );
}

export default AuthStackScreen
