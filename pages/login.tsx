import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession, signIn } from 'next-auth/react'
import UserForm from '@/components/userForm'

const Login: NextPage = () => {
  const router = useRouter()

  const { status } = useSession()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(status === 'loading')
  }, [status])

  const login = async (username: string, password: string) => {
    try {
      const response = await signIn('credentials', { redirect: false, username, password })
      if ((response || { ok: false }).ok) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return <>
    <div className="mt-8 w-full text-center text-4xl font-semibold">Login</div>
    <UserForm
      loading={loading}
      onSubmit={login}
    />
  </>
}

export default Login
