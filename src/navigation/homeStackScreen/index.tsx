import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import HomeScreen from "../../screens/homeScreen";
import WebrtcScreen from "../../screens/webrtcScreen";
import LoginScreen from "../../screens/logInScreen";
import SignUpScreen from "../../screens/signUpScreen";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name={'LogIn'} component={LoginScreen}/>
      <HomeStack.Screen name={'SignUp'} component={SignUpScreen}/>
      <HomeStack.Screen options={{headerShown: true, title: 'Home'}} name={'Home'} component={HomeScreen}/>
      <HomeStack.Screen options={{headerShown: true, headerTintColor: "black"}} name={'WebRTC'} component={WebrtcScreen}/>
    </HomeStack.Navigator>
  )
}

export default HomeStackScreen
