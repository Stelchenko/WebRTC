import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import FormButton from '../../components/formButton';
import FormInput from '../../components/formInput';
import {styles} from "./style";
import {SignUpScreenProps} from "./type";

const SignUpScreen: FC<SignUpScreenProps> = (props) => {
  const {navigation} = props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>
      <FormInput
        value={email}
        placeholder='Email'
        onChangeText={userEmail => setEmail(userEmail)}
        autoCapitalize='none'
        keyboardType='email-address'
        autoCorrect={false}
      />
      <FormInput
        value={password}
        placeholder='Password'
        onChangeText={userPassword => setPassword(userPassword)}
        secureTextEntry={true}
      />
      <FormButton buttonTitle='Signup' onPress={() => Alert.alert('sign button')} />
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('LogIn')}
      >
        <Text style={styles.navButtonText}>Already registered? Log In here</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUpScreen