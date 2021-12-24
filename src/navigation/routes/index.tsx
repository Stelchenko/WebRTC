import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AuthStackScreen from '../authStackScreen';
import HomeStackScreen from '../homeStackScreen';

import Loading from "../../components/loading";
import {AuthContext} from "../authProvider";
import {LayoutAnimation, Platform, UIManager} from "react-native";
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const Routes = () => {
  // @ts-ignore
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
    setLoading(false);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (loading) {
    return <Loading />;
  }
  return (
    <NavigationContainer>
      {user ? <HomeStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}

export default Routes
