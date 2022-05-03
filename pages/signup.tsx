import axios from 'axios'
import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as api from '@/api'
import UserForm from '@/components/userForm'
import type { SignInError } from '@/types/api/errors'

const Signup: NextPage = () => {
  const router = useRouter()

  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)

  const signUp = async (username: string, password: string) => {
    try {
      setLoading(true)
      await api.user.create(username, password)
      router.push('/login')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = (error.response?.data || {}) as SignInError
        if (!!errorData.password) {
          setPasswordError(errorData.password[0])
        }
        if (!!errorData.username) {
          setUsernameError(errorData.username[0])
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const onBlur = (field: 'username' | 'password') => {
    if (field === 'username') {
      setUsernameError('')
    }
    if (field === 'password') {
      setPasswordError('')
    }
  }

  return <>
    <div className="mt-8 w-full text-center text-4xl font-semibold">Sign Up</div>
    <UserForm
      usernameError={usernameError}
      passwordError={passwordError}
      loading={loading}
      onSubmit={signUp}
      onBlur={onBlur}
    />
  </>
}

export default Signup
