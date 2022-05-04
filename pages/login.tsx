import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSession } from '@/hooks/session'
import UserForm from '@/components/UserForm'

const Login: NextPage = () => {
  const router = useRouter()

  const { login, loggingIn } = useSession()

  const loginMethod = async (username: string, password: string) => {
    await login(username, password)
    router.push('/')
  }

  return <>
    <div className="mt-8 w-full text-center text-4xl font-semibold">Login</div>
    <UserForm
      loading={loggingIn}
      onSubmit={loginMethod}
    />
  </>
}

export default Login
