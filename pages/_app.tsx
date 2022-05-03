import type { AppProps } from 'next/app'
import { setupAPIAuthInterceptors } from '@/api/setup'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  setupAPIAuthInterceptors()
  return <Component {...pageProps} />
}

export default MyApp
