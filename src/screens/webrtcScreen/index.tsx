import React, {useEffect, useRef, useState} from "react";
import {Button, Platform, Text, TextInput, TouchableHighlight, TouchableOpacity, View} from "react-native";
import {TwilioVideo, TwilioVideoLocalView, TwilioVideoParticipantView} from "react-native-twilio-video-webrtc";
import {styles} from "./style";
import {checkMultiple, PERMISSIONS} from "react-native-permissions";

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
    if (Platform.OS === "ios") {
      checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE]).then((statuses) => {
        console.log('Camera', statuses[PERMISSIONS.IOS.CAMERA]);
        console.log('Micro', statuses[PERMISSIONS.IOS.MICROPHONE]);
      })
    }
    else if (Platform.OS === "android") {
      checkMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO]).then((statuses) => {
        console.log('Camera', statuses[PERMISSIONS.ANDROID.CAMERA]);
        console.log('Micro', statuses[PERMISSIONS.ANDROID.RECORD_AUDIO]);
      })
    }
  }

  useEffect(() => {
    console.log('ASDASDASD')
    GetAllPermissions();
  })



  const _onConnectButtonPress = () => {
    console.log('connect button press')
    twilioRef.current.connect({ roomName: roomName, accessToken: token});
    setStatus('connecting');
    console.log(status)
  }

  const _onEndButtonPress = () => {
    twilioRef.current.disconnect();
  };

  const _onMuteButtonPress = () => {
    twilioRef.current
      .setLocalAudioEnabled(!isAudioEnabled)
      .then(isEnabled => setIsAudioEnabled(isEnabled));
  };

  const _onFlipButtonPress = () => {
    twilioRef.current.flipCamera();
  };

  const _onRoomDidConnect = ({roomName, error}) => {
    console.log('onRoomDidConnect: ', roomName);

    setStatus('connected');
  };

  const _onRoomDidDisconnect = ({ roomName, error }) => {
    console.log('[Disconnect]ERROR: ', error);

    setStatus('disconnected');
  };

  const _onRoomDidFailToConnect = error => {
    console.log('[FailToConnect]ERROR: ', error);
    console.log('failed to connect')
    setStatus('disconnected');
  };

  const _onParticipantAddedVideoTrack = ({ participant, track }) => {
    console.log('onParticipantAddedVideoTrack: ', participant, track);

    setVideoTracks(
      new Map([
        ...videoTracks,
        [
          track.trackSid,
          { participantSid: participant.sid, videoTrackSid: track.trackSid },
        ],
      ]),
    );
  };

  const _onParticipantRemovedVideoTrack = ({ participant, track }) => {
    console.log('onParticipantRemovedVideoTrack: ', participant, track);

    const videoTracksLocal = videoTracks;
    videoTracksLocal.delete(track.trackSid);

    setVideoTracks(videoTracksLocal);
  };

  return (
    <View style={styles.container} >
      {
        status === 'disconnected' &&
        <View>
          <Text style={styles.welcome}>
            React Native Twilio Video
          </Text>
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
          <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={_onConnectButtonPress}>
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
              <TouchableOpacity style = {styles.remoteVideo} onPress={()=>{setIsButtonDisplay(!isButtonDisplay)}} >
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
                style = {isButtonDisplay ? styles.localVideoOnButtonEnabled : styles.localVideoOnButtonDisabled}
              />
            </View>
          }
          <View
            style = {
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
            } >
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
        ref={ twilioRef }
        onRoomDidConnect={ _onRoomDidConnect }
        onRoomDidDisconnect={ _onRoomDidDisconnect }
        onRoomDidFailToConnect= { _onRoomDidFailToConnect }
        onParticipantAddedVideoTrack={ _onParticipantAddedVideoTrack }
        onParticipantRemovedVideoTrack= { _onParticipantRemovedVideoTrack }
      />
    </View>
  );
}

export default WebrtcScreen
