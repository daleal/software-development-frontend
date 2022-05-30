import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useSession } from '@/hooks/session'

const AUTH_PATHS = ['/login', '/signup']
const OPEN_PATHS = ['/']

const NO_LOGIN_REQUIRED_PATHS = [...AUTH_PATHS, ...OPEN_PATHS]

export const RequireLoggedIn = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const { getToken } = useSession()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setLoading(true)
      if (!NO_LOGIN_REQUIRED_PATHS.includes(router.pathname)) {
        await getToken()
      } else if (AUTH_PATHS.includes(router.pathname)) {
        try {
          await getToken({ redirect: false })
          await router.push('/')
        } catch { }
      }
      setLoading(false)
    }
    checkUserLoggedIn()
  }, [Component]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <div>Loading...</div>
  }

  return <Component {...pageProps} />
}
