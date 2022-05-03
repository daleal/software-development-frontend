import * as api from '@/api'
import { useLocalStorage } from '@/hooks/localStorage'

export const useSession = () => {
  const [accessToken, setAccessToken] = useLocalStorage('access-token')
  const [refreshToken, setRefreshToken] = useLocalStorage('refresh-token')

  const refreshAccessToken = async () => {
    setAccessToken(null)
    if (refreshToken) {
      const response = await api.jwt.refresh(refreshToken)
      setAccessToken(response.access)
    }
  }

  const getToken = async () => {
    if (accessToken) {
      try {
        await api.jwt.verify(accessToken)
      } catch {
        await refreshAccessToken()
      }
      return accessToken
    }
    await refreshAccessToken()
    return accessToken
  }

  const login = async (username: string, password: string) => {
    const response = await api.jwt.create(username, password)
    setAccessToken(response.access)
    setRefreshToken(response.refresh)
  }

  return { login, getToken }
}
