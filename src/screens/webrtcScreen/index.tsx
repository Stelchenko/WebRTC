import React, {
  useContext,
  useEffect, useRef, useState
} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  TwilioVideoLocalView, // to get local view
  TwilioVideoParticipantView, //to get participant view
  TwilioVideo
} from 'react-native-twilio-video-webrtc';
import {PERMISSIONS, requestMultiple} from "react-native-permissions";
import {AuthContext} from "../../navigation/authProvider";
import FormInput from "../../components/formInput";
import FormButton from "../../components/formButton";
import {styles} from "./style";


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
  const {logout} = useContext(AuthContext);

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
        <>
            <FormInput
              onChangeText={(text) => setRoomName(text)}
              placeholder={'Room Name'}
              defaultValue={roomName}
            />
          <FormInput
            onChangeText={(text) => setToken(text)}
            placeholder={'Token'}
            defaultValue={token}
          />
          <FormButton buttonTitle={'Connect'} onPress={_onConnectButtonPress}/>
          <TouchableOpacity
            style={styles.navButton}
            onPress={logout}
          >
            <Text style={styles.navButtonText}>Log Out</Text>
          </TouchableOpacity>
        </>
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


export default WebrtcScreen
