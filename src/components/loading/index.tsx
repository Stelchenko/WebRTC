import React from "react";
import {ActivityIndicator, View} from "react-native";
import {styles} from "./style";

const Loading = () => {
  return(
    <View style={styles.loadingContainer}>
      <ActivityIndicator size='large' color='#6646ee' />
    </View>
  )
}

export default Loading
