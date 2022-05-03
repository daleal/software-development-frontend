import axios from 'axios'
import { useState } from 'react'
import type { NextPage } from 'next'
import * as api from '@/api'
import UserForm from '@/components/userForm'
import type { SignInError } from '@/types/api/errors'

const Signup: NextPage = () => {
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const signUp = async (username: string, password: string) => {
    try {
      await api.user.create(username, password)
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

  return (
    <UserForm
      usernameError={usernameError}
      passwordError={passwordError}
      onSubmit={signUp}
      onBlur={onBlur}
    />
  )
}

export default Signup
