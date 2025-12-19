import { AxiosError, AxiosRequestConfig } from 'axios'
import { http } from './http'
import { ApiResponse } from '../../types/api.type'

export async function apiRequest<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
  try {
    const res = await http.request<ApiResponse<T>>(config)

    if (!res.data.success) {
      return res.data
    }

    return res.data
  } catch (err) {
    console.error('API Request Error:', err)

    if (err instanceof AxiosError) {
      return {
        success: false,
        data: null,
        error: {
          code: err.code || 'AXIOS_ERROR',
          message:
            err.response?.data?.error?.message ||
            err.message ||
            'An error occurred during the API request'
        }
      }
    }
  }

  return {
    success: false,
    data: null,
    error: {
      code: 'NETWORK_ERROR',
      message: 'Camera service unreachable'
    }
  }
}
