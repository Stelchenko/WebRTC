import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {Alert} from "react-native";

export const AuthContext = createContext({});

export const AuthProvider = ({children} : any) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: (email:string, password:string) => {
          auth().signInWithEmailAndPassword(email, password)
            .then(() => {
              console.log('User account signed in!');
            })
            .catch(error => {
              if (error.code === 'auth/wrong-password') {
                console.log('Password is wrong!');
                Alert.alert('Password is wrong!');
              }
              if (error.code === 'auth/user-not-found') {
                console.log('The user with this email is not registered');
                Alert.alert('The user with this email is not registered')
              }
              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                Alert.alert('That email address is invalid!')
              }
              console.error(error);
            })
        },
        register: (email:string, password:string) => {
          auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
              console.log('User account created & signed in!');
            })
            .catch(error => {
              if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                Alert.alert('That email address is already in use!')
              }
              if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                Alert.alert('That email address is invalid!')
              }
              console.error(error);
            })
        },
        logout: () => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'))
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
