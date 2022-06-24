import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useSession } from '@/hooks/session'
import { MoonLoader } from 'react-spinners'
import WithNavbar from '../layouts/WithNavbar'


const AUTH_PATHS = ['/login', '/signup']
const OPEN_PATHS = ['/']

const NO_LOGIN_REQUIRED_PATHS = [...AUTH_PATHS, ...OPEN_PATHS]

export const RequireLoggedIn = ({ Component, pageProps }: AppProps) => {
  const router = useRouter()
  const { getToken, logout } = useSession()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      setLoading(true)
      if (!NO_LOGIN_REQUIRED_PATHS.includes(router.pathname)) {
        try {
          await getToken()
        } catch {
          await logout()
        }
      } else if (AUTH_PATHS.includes(router.pathname)) {
        try {
          await getToken()
          await router.push('/')
        } catch { }
      }
      setLoading(false)
    }
    if (typeof window !== 'undefined') checkUserLoggedIn()
  }, [Component]) // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <MoonLoader loading={loading} color={'#1e40af'} />
  }

  if (pageProps.skipNavbar) {
    return <Component {...pageProps} />
  }

  return <WithNavbar><Component {...pageProps} /></WithNavbar>
}
