import * as z from 'zod'
import {
  cameraStatusSchema,
  captureCameraSchema,
  connectCameraSchema,
  createSessionSchema,
  disconnectCameraSchema,
  liveViewActionSchema,
  liveViewFrameSchema,
  pingCameraSchema
} from '../schemas/camera.schema'

type PingCamera = z.infer<typeof pingCameraSchema>
type CameraStatus = z.infer<typeof cameraStatusSchema>
type ConnectCamera = z.infer<typeof connectCameraSchema>
type DisconnectCamera = z.infer<typeof disconnectCameraSchema>
type CaptureCamera = z.infer<typeof captureCameraSchema>
type LiveViewAction = z.infer<typeof liveViewActionSchema>
type LiveViewFrame = z.infer<typeof liveViewFrameSchema>
type CreateCameraSession = z.infer<typeof createSessionSchema>

export type {
  PingCamera,
  CameraStatus,
  ConnectCamera,
  DisconnectCamera,
  CaptureCamera,
  LiveViewAction,
  LiveViewFrame,
  CreateCameraSession
}
