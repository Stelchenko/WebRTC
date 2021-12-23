import React, {
  useEffect, useRef, useState
} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight, Platform
} from 'react-native';
import {
  TwilioVideoLocalView, // to get local view
  TwilioVideoParticipantView, //to get participant view
  TwilioVideo
} from 'react-native-twilio-video-webrtc';
import {PERMISSIONS, requestMultiple} from "react-native-permissions";


const WebrtcScreen = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isButtonDisplay, setIsButtonDisplay] = useState(true);
  const [status, setStatus] = useState('disconnected');
  const [participants, setParticipants] = useState(new Map());
  const [videoTracks, setVideoTracks] = useState(new Map());
  const [token, setToken] = useState('');
  const [roomName, setRoomName] = useState('')
  const twilioRef = useRef(null);

  const GetAllPermissions = () => {
    console.log(Platform.OS)
    if (Platform.OS === "ios") {
      console.log('asdasdasd')
      requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE]).then((statuses) => {
        console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
        console.log('Micro', statuses[PERMISSIONS.IOS.MICROPHONE]);
      })
    } else if (Platform.OS === "android") {
      requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO]).then((statuses) => {
        console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
        console.log('Micro', statuses[PERMISSIONS.ANDROID.RECORD_AUDIO]);
      })
    }
  }

  useEffect(() => {
    GetAllPermissions();
  })

  const _onConnectButtonPress = () => {
    console.log("in on connect button preess");
    twilioRef.current.connect({roomName: roomName, accessToken: token})
    setStatus('connecting')
    console.log(status);
  }
  const _onEndButtonPress = () => {
    twilioRef.current.disconnect()
  }
  const _onMuteButtonPress = () => {
    // on cliking the mic button we are setting it to mute or viceversa
    twilioRef.current.setLocalAudioEnabled(!isAudioEnabled)
      .then(isEnabled => setIsAudioEnabled(isEnabled))
  }
  const _onFlipButtonPress = () => {
    // switches between fronst camera and Rare camera
    twilioRef.current.flipCamera()
  }
  const _onRoomDidConnect = () => {
    console.log("room did connected");
    setStatus('connected')
    // console.log("over");
  }
  const _onRoomDidDisconnect = ({roomName, error}) => {
    console.log("ERROR: ", JSON.stringify(error))
    console.log("disconnected")

    setStatus('disconnected')
  }
  const _onRoomDidFailToConnect = (error) => {
    console.log("ERROR: ", JSON.stringify(error));
    console.log("failed to connect");
    setStatus('disconnected')
  }
  const _onParticipantAddedVideoTrack = ({participant, track}) => {
    // call everytime a participant joins the same room
    console.log("onParticipantAddedVideoTrack: ", participant, track)
    setVideoTracks(new Map([
        ...videoTracks,
        [track.trackSid, {participantSid: participant.sid, videoTrackSid: track.trackSid}]
      ]),
    );

    console.log("this.state.videoTracks", videoTracks);
  }
  const _onParticipantRemovedVideoTrack = ({participant, track}) => {
    // gets called when a participant disconnects.
    console.log("onParticipantRemovedVideoTrack: ", participant, track)
    const videoTracksLocal = videoTracks
    videoTracksLocal.delete(track.trackSid)
    setVideoTracks({...videoTracksLocal})
  }


  return (

    <View style={styles.container}>
      {
        status === 'disconnected' &&
        <View>
          <View style={styles.spacing}>
            <Text style={styles.inputLabel}>Room Name</Text>
            <TextInput style={styles.inputBox}
                       placeholder="Room Name"
                       defaultValue={roomName}
                       onChangeText={(text) => setRoomName(text)}
            />
          </View>
          <View style={styles.spacing}>
            <Text style={styles.inputLabel}>Token</Text>
            <TextInput style={styles.inputBox}
                       placeholder="Token"
                       defaultValue={token}
                       onChangeText={(text) => setToken(text)}
            />
          </View>
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]}
                              onPress={_onConnectButtonPress}>
            <Text style={styles.Buttontext}>Connect</Text>
          </TouchableHighlight>
        </View>
      }
      {
        (status === 'connected' || status === 'connecting') &&
        <View style={styles.callContainer}>
          {
            status === 'connected' &&
            <View style={styles.remoteGrid}>
              <TouchableOpacity style={styles.remoteVideo} onPress={() => {
                setIsButtonDisplay(!isButtonDisplay)
              }}>
                {
                  Array.from(videoTracks, ([trackSid, trackIdentifier]) => {
                    return (
                      <TwilioVideoParticipantView
                        style={styles.remoteVideo}
                        key={trackSid}
                        trackIdentifier={trackIdentifier}
                      />
                    )
                  })
                }
              </TouchableOpacity>
              <TwilioVideoLocalView
                enabled={true}
                style={isButtonDisplay ? styles.localVideoOnButtonEnabled : styles.localVideoOnButtonDisabled}
              />
            </View>
          }
          <View
            style={
              {
                display: isButtonDisplay ? "flex" : "none",
                position: "absolute",
                left: 0,
                bottom: 0,
                right: 0,
                height: 100,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                // backgroundColor:"blue",
                // zIndex: 2,
                zIndex: isButtonDisplay ? 2 : 0,
              }
            }>
            <TouchableOpacity
              style={
                {
                  display: isButtonDisplay ? "flex" : "none",
                  width: 60,
                  height: 60,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 100 / 2,
                  backgroundColor: 'grey',
                  justifyContent: 'center',
                  alignItems: "center"
                }
              }
              onPress={_onMuteButtonPress}>
              <Text>Mute</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                {
                  display: isButtonDisplay ? "flex" : "none",
                  width: 60,
                  height: 60,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 100 / 2,
                  backgroundColor: 'grey',
                  justifyContent: 'center',
                  alignItems: "center"
                }
              }
              onPress={_onEndButtonPress}>
              <Text style={{fontSize: 12}}>End</Text>

            </TouchableOpacity>
            <TouchableOpacity
              style={
                {
                  display: isButtonDisplay ? "flex" : "none",
                  width: 60,
                  height: 60,
                  marginLeft: 10,
                  marginRight: 10,
                  borderRadius: 100 / 2,
                  backgroundColor: 'grey',
                  justifyContent: 'center',
                  alignItems: "center"
                }
              }
              onPress={_onFlipButtonPress}>
              <Text style={{fontSize: 12}}>Flip</Text>

            </TouchableOpacity>
          </View>

        </View>
      }
      <TwilioVideo
        ref={twilioRef}
        onRoomDidConnect={_onRoomDidConnect}
        onRoomDidDisconnect={_onRoomDidDisconnect}
        onRoomDidFailToConnect={_onRoomDidFailToConnect}
        onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
        onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}
      />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  callContainer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    minHeight: "100%"
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
    borderBottomWidth: 1
  },
});

export default WebrtcScreen
