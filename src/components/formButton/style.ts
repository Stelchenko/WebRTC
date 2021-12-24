import {StyleSheet} from "react-native";
import { windowHeight, windowWidth } from '../../utils/dimension';

export const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: windowWidth / 1.7,
    height: windowHeight / 15,
    backgroundColor: '#6646ee',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },
  buttonText: {
    fontSize: 28,
    color: '#ffffff'
  }
})
