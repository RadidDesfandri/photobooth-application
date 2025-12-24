const cameraKeys = {
  all: ['camera'] as const,
  ping: () => [...cameraKeys.all, 'ping'] as const,
  status: () => [...cameraKeys.all, 'status'] as const,
  liveViewFrame: () => [...cameraKeys.all, 'liveview-frame'] as const
}

export { cameraKeys }
