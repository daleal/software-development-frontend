import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as api from '@/api'


export const useSession = () => {
  const router = useRouter()

  const [loggingIn, setLoggingIn] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)

  const refreshAccessToken = async () => {
    localStorage.removeItem('access-token')
    if (localStorage.getItem('refresh-token')) {
      const response = await api.jwt.refresh(localStorage.getItem('refresh-token') || '')
      localStorage.setItem('access-token', response.access)
    }
  }

  const logout = async () => {
    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
    localStorage.removeItem('logged-in')
    await router.push('/login')
  }

  const getAccessTokenOrThrowError = () => {
    if (!localStorage.getItem('access-token')) {
      throw new Error('Invalid credentials')
    }
    localStorage.setItem('logged-in', 'true')
    return localStorage.getItem('access-token')
  }

  const getToken = async () => {
    try {
      if (localStorage.getItem('access-token')) {
        try {
          await api.jwt.verify(localStorage.getItem('access-token') || '')
        } catch {
          await refreshAccessToken()
        }
        return getAccessTokenOrThrowError()
      }
      await refreshAccessToken()
      return getAccessTokenOrThrowError()
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
      localStorage.setItem('logged-in', 'true')
    } finally {
      setLoggingIn(false)
    }
  }

  useEffect(() => { // eslint-disable-line react-hooks/exhaustive-deps
    if (typeof window !== 'undefined') {
      setLoggedIn(localStorage.getItem('logged-in') === 'true')
    }
  })

  return {
    login,
    loggingIn,
    loggedIn,
    logout,
    getToken
  }
}
