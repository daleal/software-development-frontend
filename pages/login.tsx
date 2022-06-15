import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from '@/hooks/session'
import UserForm from '@/components/UserForm'
import { useState } from 'react'
import axios from 'axios'
import type { LogInError } from '@/types/api/errors'

const Login: NextPage = () => {
  const router = useRouter()

  const { login, loggingIn } = useSession()

  const [loginError, setLoginError] = useState('')

  const loginMethod = async (username: string, password: string) => {
    try {
      await login(username, password)
      await router.push('/')
    } catch(error) {
      if (axios.isAxiosError(error)) {
        const errorData = (error.response?.data || {}) as LogInError
        console.log(errorData)
        if (!!errorData.detail) {
          setLoginError(errorData.detail)
        }
      }
    }
  }

  const onBlur = (field: 'username' | 'phone-number' | 'password') => {
    if (field) {
      setLoginError('')
    }
  }

  return <>
    <div className="mt-8 w-full text-center text-4xl font-semibold">Login</div>
    <UserForm
      loading={loggingIn}
      onSubmit={loginMethod}
      loginError={loginError}
      onBlur={onBlur}
    />
  </>
}

export default Login
