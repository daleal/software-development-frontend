import client from './client'
import { Nullable } from '@/types/common'
import type { GetTokenOptions } from '@/hooks/session'

export const setupAPIAuthInterceptors = (getToken: (options?: GetTokenOptions) => Promise<Nullable<string>>, logout: ()=> Promise<void>) => {
  client.interceptors.request.use(async (config) => {
    if (!['/auth/jwt/refresh/', '/auth/jwt/verify/'].includes(config.url ?? '')) {
      try {
        const token = await getToken()
        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `JWT ${token}`,
          }
        }
      } catch {}
      
    }
    return config
  })

  client.interceptors.response.use(
    response => response,
    async (error)=> {
    if (error.response.status === 401 && error.config.url !== '/auth/jwt/create/') {
      await logout()
    }
    return Promise.reject(error)
  })
}
