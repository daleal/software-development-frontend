import axios from 'axios'
import { useRef, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import * as api from '@/api'
import UserForm from '@/components/UserForm'
import type { SignInError } from '@/types/api/errors'

const Signup: NextPage = () => {
  const router = useRouter()

  const [usernameError, setUsernameError] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loading, setLoading] = useState(false)
  const mounted = useRef(false);

  const signUp = async (username: string, password: string, phoneNumber?: string) => {
    try {
      setLoading(true)
      const resp = await api.user.create(username, phoneNumber || '', password)
      console.log(resp)
      await router.push('/login')
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorData = (error.response?.data || {}) as SignInError
        if (!!errorData.username) {
          setUsernameError(errorData.username[0])
        }
        if (!!errorData.phoneNumber) {
          setPhoneNumberError(errorData.phoneNumber[0])
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
    <div className="mt-8 w-full text-center text-4xl font-semibold">Sign Up</div>
    <UserForm
      usernameError={usernameError}
      phoneNumberError={phoneNumberError}
      passwordError={passwordError}
      showPhoneNumber
      loading={loading}
      onSubmit={signUp}
      onBlur={onBlur}
    />
  </>
}

export default Signup
