import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import WebrtcScreen from "../../screens/webrtcScreen";

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen options={{headerShown: true, headerTintColor: "black"}} name={'WebRTC'} component={WebrtcScreen}/>
    </HomeStack.Navigator>
  )
}

export default HomeStackScreen
