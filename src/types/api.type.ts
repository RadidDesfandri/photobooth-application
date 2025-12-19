interface ApiErrorDetail {
  code: string
  message: string
}

interface ApiResponse<T> {
  success: boolean
  data: T | null
  error: ApiErrorDetail | null
}

export type { ApiErrorDetail, ApiResponse }
