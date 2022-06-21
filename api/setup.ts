import client from './client'
import { Nullable } from '@/types/common'

export const setupAPIAuthInterceptors = (getToken: () => Promise<Nullable<string>>, logout: ()=> Promise<void>) => {
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

  client.interceptors.response.use(async (error)=> {
    if(error.status === 401) {
      await logout()
    }
    return error
  })
}
