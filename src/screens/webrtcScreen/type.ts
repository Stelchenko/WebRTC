export type WebrtcScreenViewProps = {
  status: string,
  setRoomName: (roomName: string) => void,
  roomName: string,
  setToken: (token: string) => void,
  token: string,
  _onConnectButtonPress: () => void,
  logout: () => void,
  setIsButtonDisplay: (isButton: boolean) => void,
  isButtonDisplay: boolean,
  videoTracks: any,
  pan: any,
  panResponder: any,
  _onMuteButtonPress: () => void,
  _onEndButtonPress: () => void,
  _onFlipButtonPress: () => void,
  twilioRef: any,
  _onRoomDidConnect: () => void,
  _onRoomDidDisconnect: () => void,
  _onRoomDidFailToConnect: (error: any) => void,
  _onParticipantAddedVideoTrack: ({participant, track} : any) => void,
  _onParticipantRemovedVideoTrack: ({participant, track}: any) => void,
}
