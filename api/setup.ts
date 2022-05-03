import { useSession } from '@/hooks/session'
import client from './client'

export const setupAPIAuthInterceptors = () => {
  // client.interceptors.request.use(async (config) => {
  //   const { getToken } = useSession()

  //   const token = await getToken()

  //   if (token) {
  //     // eslint-disable-next-line no-param-reassign
  //     config.headers = {
  //       ...config.headers,
  //       Authorization: `JWT ${token}`,
  //     }
  //   }
  //   return config
  // })
}
