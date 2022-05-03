import type { NextPage } from 'next'
import * as api from '@/api'
import { useSession } from '@/hooks/session'
import { useCallback } from 'react'

const USERNAME = 'daleal'
const PASSWORD = 'ferchoni'

const A: NextPage = () => {
  const { login, accessToken, refreshToken } = useSession()

  const signup = useCallback(async () => {
    try {
      const response = await api.user.create(USERNAME, PASSWORD)
      console.log('NAIS')
      console.log(response)
    } catch (error) {
      console.log('F')
      console.log(error)
    }
  }, [])

  const loginMethod = useCallback(async () => {
    try {
      const response = await login(USERNAME, PASSWORD)
      console.log('NAIS')
      console.log(response)
    } catch (error) {
      console.log('F')
      console.log(error)
    }
  }, [])

  return <>
    <button onClick={signup}>SIGNUP</button>
    <button onClick={loginMethod}>LOGIN</button>
    <div>{ accessToken }</div>
    <div>{ refreshToken }</div>
  </>
}

export default A
