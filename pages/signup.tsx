import axios from 'axios'
import { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as api from '@/api'
import UserForm from '@/components/UserForm'
import type { SignInError } from '@/types/api/errors'
import { errors } from '@/constants/errors'

const Signup: NextPage = () => {
  const router = useRouter()

  const [usernameError, setUsernameError] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)

  const signUp = async (username: string, password: string, phoneNumber?: string) => {
    try {
      setLoading(true)
      await api.user.create(username, phoneNumber || '', password)
      window.alert('signed up!')
      router.push('/login')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = (error.response?.data || {}) as SignInError
        if (!!errorData.username) {
          setUsernameError(
            errors.signup.username[errorData.username[0] as keyof typeof errors.signup.username] || errorData.username[0]
            )
        }
        if (!!errorData.phoneNumber) {
          setPhoneNumberError(
            errors.signup.phoneNumber[errorData.phoneNumber[0] as keyof typeof errors.signup.phoneNumber] || errorData.phoneNumber[0]
            )
        }
        if (!!errorData.password) {
          setPasswordError(errorData.password[0])
        }
      }
    } finally {
      setLoading(false)
    }
  }

  const onBlur = (field: 'username' | 'phone-number' | 'password') => {
    if (field === 'username') {
      setUsernameError('')
    }
    if (field === 'phone-number') {
      setPhoneNumberError('')
    }
    if (field === 'password') {
      setPasswordError('')
    }
  }

  return <>
    <UserForm
      formTitle='Crea una cuenta en Rentool'
      usernameError={usernameError}
      phoneNumberError={phoneNumberError}
      passwordError={passwordError}
      showPhoneNumber
      loading={loading}
      onSubmit={signUp}
      onBlur={onBlur}
      buttonText='Registrarme'
    />
  </>
}

export default Signup
