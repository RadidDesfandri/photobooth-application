import * as z from 'zod'

const pingCameraSchema = z.string()

type PingCamera = z.infer<typeof pingCameraSchema>

export type { PingCamera }
