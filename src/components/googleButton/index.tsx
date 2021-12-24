import React from 'react';
import FormButton from "../formButton";
import {GoogleSignin} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

async function onGoogleButtonPress() {
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

const GoogleSignIn = () => {
  return (
    // @ts-ignore
    <FormButton buttonTitle={'Google Sign-In'} onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}/>
  );
}

export default GoogleSignIn
