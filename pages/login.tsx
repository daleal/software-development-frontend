import type { NextPage } from 'next'
import { signIn } from 'next-auth/react'
import UserForm from '@/components/userForm'

const Login: NextPage = () => {
  const login = async (username: string, password: string) => {
    await signIn('credentials', { username, password })
  }

  return <UserForm onSubmit={login} />
}

export default Login
