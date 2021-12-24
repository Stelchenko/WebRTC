import React, {FC, useContext, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FormButton from '../../components/formButton';
import FormInput from '../../components/formInput';
import {styles} from "./style";
import {SignUpScreenProps} from "./type";
import {AuthContext} from "../../navigation/authProvider";

const SignUpScreen: FC<SignUpScreenProps> = (props) => {
  const {navigation} = props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //@ts-ignore
  const { register } = useContext(AuthContext);
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
      {/*@ts-ignore*/}
      <FormButton buttonTitle='Signup' onPress={() => register(email, password)} />
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
