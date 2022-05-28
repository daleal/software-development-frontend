import client from './client'
import { Nullable } from '@/types/common'

export const setupAPIAuthInterceptors = (getToken: (options?: { refresh?: boolean }) => Promise<Nullable<string>>) => {
  client.interceptors.request.use(async (config) => {
    const refresh = config.url === '/auth/jwt/refresh/' ? false : true
    const token = await getToken({ refresh })

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `JWT ${token}`,
      }
    }
    return config
  })
}
