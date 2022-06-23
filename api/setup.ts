import client from './client'
import { Nullable } from '@/types/common'

export const setupAPIAuthInterceptors = (getToken: () => Promise<Nullable<string>>, logout: ()=> Promise<void>) => {
  const reqInterceptor = client.interceptors.request.use(async (config) => {
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

  const resInterceptor = client.interceptors.response.use(
    response => response,
    async (error)=> {
    if (error.response.status === 401 && error.config.url !== '/auth/jwt/create/') {
      await logout()
    }
    return Promise.reject(error)
  })

  return [reqInterceptor, resInterceptor]

}

export const ejectInterceptors = (reqInterceptor: number, resInterceptor: number) => {
  client.interceptors.request.eject(reqInterceptor)
  client.interceptors.response.eject(resInterceptor)
}