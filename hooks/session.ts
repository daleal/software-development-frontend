import { useState } from 'react'
import { useRouter } from 'next/router'
import * as api from '@/api'
import { useLocalStorage } from '@/hooks/localStorage'
import { Nullable } from '@/types/common'

export const useSession = () => {
  const router = useRouter()

  const [accessToken, setAccessToken] = useLocalStorage('access-token')
  const [refreshToken, setRefreshToken] = useLocalStorage('refresh-token')
  const [loggingIn, setLoggingIn] = useState(false)

  const refreshAccessToken = async () => {
    setAccessToken(null)
    if (refreshToken) {
      const response = await api.jwt.refresh(refreshToken)
      setAccessToken(response.access)
    }
  }

  const logout = () => {
    setAccessToken(null)
    setRefreshToken(null)
  }

  const getToken = async () => {
    try {
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
    } catch {
      logout()
      router.push('/login')
      return null
    }
  }

  const login = async (username: string, password: string) => {
    try {
      setLoggingIn(true)
      const response = await api.jwt.create(username, password)
      setAccessToken(response.access)
      setRefreshToken(response.refresh)
    } finally {
      setLoggingIn(false)
    }
  }

  return {
    login,
    loggingIn,
    logout,
    getToken,
    accessToken,
    refreshToken,
  }
}
