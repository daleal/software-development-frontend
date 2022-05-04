import type { AppProps } from 'next/app'
import { useSession } from '@/hooks/session'
import '@/styles/globals.css'
import { setupAPIAuthInterceptors } from '@/api/setup'

function MyApp({ Component, pageProps }: AppProps) {
  const { getToken } = useSession()

  setupAPIAuthInterceptors(getToken)

  return <Component {...pageProps} />
}

export default MyApp
