const ipcCameraKeys = {
  ping: 'ping-camera' as const,
  cameraStatus: 'camera-status' as const,
  connect: 'camera-connect' as const,
  disconnect: 'camera-disconnect' as const,
  capture: 'camera-capture' as const,
  startLiveView: 'camera-liveview-start' as const,
  stopLiveView: 'camera-liveview-stop' as const,
  liveViewFrame: 'camera-liveview-frame' as const,
  createSession: 'camera-create-session' as const
}

export { ipcCameraKeys }
