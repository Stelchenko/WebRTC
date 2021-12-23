import React, {FC, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import FormButton from '../../components/formButton';
import FormInput from '../../components/formInput';
import {styles} from "./style";
import {LoginScreenProps} from "./type";

const LoginScreen: FC<LoginScreenProps> = (props) => {
  const {navigation} = props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Skype 2.0</Text>
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
      <FormButton buttonTitle='Login' onPress={() => Alert.alert('login button')} />
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.navButtonText}>New user? Join here</Text>
      </TouchableOpacity>
    </View>
  );
}

export default LoginScreen
