import React from 'react';
import Providers from "./src/navigation/providers";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '691882632086-jaub3bf3ct5liol6mq44s5katkidcjja.apps.googleusercontent.com',
});

const App = () => {
  return (
    <Providers />
  );

}


export default App
