import React, {FC} from "react";
import {Animated, Text, TouchableOpacity, View} from "react-native";
import {styles} from "./style";
import FormInput from "../../components/formInput";
import FormButton from "../../components/formButton";
import {TwilioVideo, TwilioVideoLocalView, TwilioVideoParticipantView} from "react-native-twilio-video-webrtc";
import {WebrtcScreenViewProps} from "./type";

const WebrtcScreenView: FC<WebrtcScreenViewProps> = (props) => {
  const {
    status,
    setRoomName,
    roomName,
    setToken,
    token,
    _onConnectButtonPress,
    logout,
    setIsButtonDisplay,
    isButtonDisplay,
    videoTracks,
    pan,
    panResponder,
    _onMuteButtonPress,
    _onEndButtonPress,
    _onFlipButtonPress,
    twilioRef,
    _onRoomDidConnect,
    _onRoomDidDisconnect,
    _onRoomDidFailToConnect,
    _onParticipantAddedVideoTrack,
    _onParticipantRemovedVideoTrack
  } = props
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
              <Animated.View
                style={[isButtonDisplay ? styles.localVideoOnButtonEnabled : styles.localVideoOnButtonDisabled,
                  {transform: [{translateX: pan.x}, {translateY: pan.y}]}
                ]}
                {...panResponder.panHandlers}
              >
                <TwilioVideoLocalView
                  enabled={true}
                  style={[{height: 150, width: 150}]}
                />
              </Animated.View>
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

export default WebrtcScreenView
