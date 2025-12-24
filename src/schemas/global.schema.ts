import * as z from 'zod'

const requiredStringSchema = z.string()

const nullableStringSchema = z.string().nullable()

export { requiredStringSchema, nullableStringSchema }
