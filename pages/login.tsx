import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from '@/hooks/session'
import UserForm from '@/components/UserForm'
import { useState } from 'react'
import axios from 'axios'
import type { LogInError } from '@/types/api/errors'
import { errors } from '@/constants/errors'

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
          setLoginError(errors.login[errorData.detail as keyof typeof errors.login])
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
    <UserForm
      formTitle='Inicia sesión en Rentool'
      showRegisterLink
      loading={loggingIn}
      onSubmit={loginMethod}
      loginError={loginError}
      onBlur={onBlur}
      buttonText='Iniciar sesión'
    />
  </>
}

export default Login

export function getServerSideProps() {
  return {
    props: { skipNavbar: true }
  };
}
