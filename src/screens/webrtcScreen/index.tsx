import React, {
  useContext,
  useEffect, useRef, useState
} from 'react';
import {
  Platform, Animated, PanResponder,
} from 'react-native';
import {PERMISSIONS, requestMultiple} from "react-native-permissions";
import {AuthContext} from "../../navigation/authProvider";
import WebrtcScreenView from "./webrtcScreenView";


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
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value
        });
      },
      onPanResponderMove: Animated.event(
        [
          null,
          {dx: pan.x, dy: pan.y}
        ]
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
      }
    })
  ).current;

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
  const _onRoomDidDisconnect = () => {
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
    <WebrtcScreenView
      status={status}
      setRoomName={setRoomName}
      roomName={roomName}
      setToken={setToken}
      token={token}
      _onConnectButtonPress={_onConnectButtonPress}
      logout={logout}
      setIsButtonDisplay={setIsButtonDisplay}
      isButtonDisplay={isButtonDisplay}
      videoTracks={videoTracks}
      pan={pan}
      panResponder={panResponder}
      _onMuteButtonPress={_onMuteButtonPress}
      _onEndButtonPress={_onEndButtonPress}
      _onFlipButtonPress={_onFlipButtonPress}
      twilioRef={twilioRef}
      _onRoomDidConnect={_onRoomDidConnect}
      _onRoomDidDisconnect={_onRoomDidDisconnect}
      _onRoomDidFailToConnect={_onRoomDidFailToConnect}
      _onParticipantAddedVideoTrack={_onParticipantAddedVideoTrack}
      _onParticipantRemovedVideoTrack={_onParticipantRemovedVideoTrack}/>
  )

}


export default WebrtcScreen
