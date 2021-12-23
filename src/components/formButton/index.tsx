import React, {FC} from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import {styles} from "./style";
import {FormButtonProps} from "./type";


const FormButton:FC<FormButtonProps> = ({buttonTitle, ...rest}) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}

export default FormButton
