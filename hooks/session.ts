import { useState } from 'react'
import { useRouter } from 'next/router'
import * as api from '@/api'

export interface GetTokenOptions {
  redirect?: boolean
}

const getValueFromOptions = <OptionKey extends keyof GetTokenOptions>(
  value: OptionKey,
  options?: GetTokenOptions,
  def?: GetTokenOptions[OptionKey],
) => (options || {})[value] ?? def

export const useSession = () => {
  const router = useRouter()

  const [loggingIn, setLoggingIn] = useState(false)

  const refreshAccessToken = async () => {
    localStorage.removeItem('access-token')
    if (localStorage.getItem('refresh-token')) {
      const response = await api.jwt.refresh(localStorage.getItem('refresh-token') || '')
      localStorage.setItem('access-token', response.access)
    }
  }

  const logout = async() => {
    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
    router.push('/login')
  }

  const getToken = async (options?: GetTokenOptions) => {
    try {
      if (localStorage.getItem('access-token')) {
        try {
          await api.jwt.verify(localStorage.getItem('access-token') || '')
        } catch {
          await refreshAccessToken()
        }
        if (!localStorage.getItem('access-token')) {
          throw new Error('Invalid credentials')
        }
        return localStorage.getItem('access-token')
      }
      await refreshAccessToken()
      if (!localStorage.getItem('access-token')) {
        throw new Error('Invalid credentials')
      }
      return localStorage.getItem('access-token')
    } catch {
      if (typeof window !== 'undefined') {
        throw new Error('Invalid credentials')
      }
      return null
    }
  }

  const login = async (username: string, password: string) => {
    try {
      setLoggingIn(true)
      const response = await api.jwt.create(username, password)
      localStorage.setItem('access-token', response.access)
      localStorage.setItem('refresh-token', response.refresh)
    } finally {
      setLoggingIn(false)
    }
  }

  return {
    login,
    loggingIn,
    logout,
    getToken
  }
}
