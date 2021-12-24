import React, {FC, useContext, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FormButton from '../../components/formButton';
import FormInput from '../../components/formInput';
import {styles} from "./style";
import {LoginScreenProps} from "./type";
import {AuthContext} from "../../navigation/authProvider";
import GoogleSignIn from "../../components/googleButton";

const LoginScreen: FC<LoginScreenProps> = (props) => {
  const {navigation} = props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //@ts-ignores
  const {login} = useContext(AuthContext);
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
      {/*//@ts-ignore*/}
      <FormButton buttonTitle='Login' onPress={() => login(email, password)}/>
      <GoogleSignIn/>
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
