import client from './client'
import { Nullable } from '@/types/common'

export const setupAPIAuthInterceptors = (getToken: () => Promise<Nullable<string>>) => {
  client.interceptors.request.use(async (config) => {
    const token = await getToken()

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `JWT ${token}`,
      }
    }
    return config
  })
}
