import React, {FC} from "react";
import {Button, Platform, Text, View} from "react-native";
import {request, PERMISSIONS, requestMultiple} from "react-native-permissions";
import {HomeScreenProps} from "./type";
import {styles} from "./style";

const HomeScreen: FC<HomeScreenProps> = props => {
  const {navigation} = props
  const navigationHandler = (path: string, props: {}) => {
    navigation.navigate(path, props)
  }

  const requestCameraPermission = () => {
    if (Platform.OS === "ios") {
      request(PERMISSIONS.IOS.CAMERA).then((result) => {
        console.log('iOS Camera', result)
      });
    }
    else if (Platform.OS === "android") {
      request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
        console.log('Android camera', result)
      })
    }
  }



  return (
    <View style={styles.screen}>
      <Button title={'request camera permission'} onPress={() => requestCameraPermission()}></Button>
      <Button title={'Go To The Webrtc'} onPress={() => navigationHandler('WebRTC', {})}/>
    </View>
  )
}

export default HomeScreen