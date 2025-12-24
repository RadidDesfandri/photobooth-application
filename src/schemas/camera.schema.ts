import * as z from 'zod'
import { requiredStringSchema } from './global.schema'

const pingCameraSchema = requiredStringSchema

const cameraStatusSchema = z.object({
  type: requiredStringSchema,
  state: z.enum(['Disconnected', 'Connected', 'LiveView', 'Capturing']),
  isConnected: z.boolean(),
  isLiveView: z.boolean(),
  timestamp: requiredStringSchema
})

const connectCameraSchema = z.object({
  message: requiredStringSchema,
  status: cameraStatusSchema
})

const disconnectCameraSchema = requiredStringSchema

const liveViewActionSchema = requiredStringSchema

const liveViewFrameSchema = z.object({
  timestamp: z.number(),
  format: requiredStringSchema,
  size: z.number(),
  image: requiredStringSchema
})

const captureCameraSchema = z.object({
  path: requiredStringSchema,
  filename: requiredStringSchema,
  timestamp: requiredStringSchema
})

export {
  pingCameraSchema,
  cameraStatusSchema,
  connectCameraSchema,
  disconnectCameraSchema,
  liveViewActionSchema,
  liveViewFrameSchema,
  captureCameraSchema
}
