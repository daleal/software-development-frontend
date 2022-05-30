import client from './client'
import { Nullable } from '@/types/common'
import type { GetTokenOptions } from '@/hooks/session'

export const setupAPIAuthInterceptors = (getToken: (options?: GetTokenOptions) => Promise<Nullable<string>>) => {
  client.interceptors.request.use(async (config) => {
    if (!['/auth/jwt/refresh/', '/auth/jwt/verify/'].includes(config.url ?? '')) {
      const token = await getToken()

      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `JWT ${token}`,
        }
      }
    }
    return config
  })
}
