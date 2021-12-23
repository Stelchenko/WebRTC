import React, {FC} from "react";
import {TextInput, TextInputProps} from "react-native";
import {FormInputProps} from "./type";
import {styles} from "./style";

const FormInput: FC<TextInputProps> = ({value, placeholder, ...rest}) => {
  return (
    <TextInput
      value={value}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholder}
      placeholderTextColor='#666'
      {...rest}
    />
  )
}

export default FormInput
