import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  callContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    minHeight:"100%"
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    paddingTop: 40
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginRight: 70,
    marginLeft: 70,
    marginTop: 50,
    textAlign: 'center',
    backgroundColor: 'white'
  },
  button: {
    marginTop: 100
  },
  localVideoOnButtonEnabled: {
    bottom: ("40%"),
    width: "35%",
    left: "64%",
    height: "25%",
    zIndex: 2,
  },
  localVideoOnButtonDisabled: {
    bottom: ("30%"),
    width: "35%",
    left: "64%",
    height: "25%",
    zIndex: 2,
  },
  remoteGrid: {
    flex: 1,
    flexDirection: "column",
  },
  remoteVideo: {
    width: 300,
    height: 500,
    zIndex: 1,
  },
  optionsContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    zIndex: 2,
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: "center"
  },
  spacing: {
    padding: 10
  },
  inputLabel: {
    fontSize: 18
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#1E3378",
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginTop: 10
  },
  Buttontext: {
    color: 'white',
    fontWeight: '500',
    fontSize: 18
  },
  inputBox: {
    borderBottomColor: '#cccccc',
    fontSize: 16,
    borderBottomWidth:1
  },
  navButton: {
    marginTop: 15
  },
  navButtonText: {
    fontSize: 20,
    color: '#6646ee'
  }
})
