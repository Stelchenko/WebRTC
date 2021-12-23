import React, {FC, useEffect, useState} from "react";
import {Button, Platform, Text, TextInput, View} from "react-native";
import {request, PERMISSIONS, requestMultiple} from "react-native-permissions";
import {HomeScreenProps} from "./type";
import {styles} from "./style";
import auth from '@react-native-firebase/auth';

const HomeScreen: FC<HomeScreenProps> = props => {
  const {navigation} = props
  const navigationHandler = (path: string, props: {}) => {
    navigation.navigate(path, props)
  }
  const [initializing, setInitializing] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  const logIn = (email:string, password:string) => {
    auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      })
  }

  const signIn = (email:string, password:string) => {
    auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      })
  }

  const logOut = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'))
  }


  if (!user) {
    return (
      <View>
        <TextInput placeholder={'Email'} value={email} onChangeText={text => setEmail(text)}/>
        <TextInput placeholder={'Password'} value={password} onChangeText={text => setPassword(text)}/>
        <Button title={'LogIn'} onPress={() => logIn(email, password)}/>
        <Button title={'SignIn'} onPress={() => signIn(email, password)}/>
      </View>
    );
  }

  return (
    <View>
      <Text>Welcome {user.email}</Text>
      <Button title={'exit'} onPress={() => logOut()}/>
    </View>
  );


  // return (
  //   <View style={styles.screen}>
  //
  //     <Button title={'Go To The Webrtc'} onPress={() => navigationHandler('WebRTC', {})}/>
  //   </View>
  // )
}

export default HomeScreen
