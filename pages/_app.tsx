import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { setupAPIAuthInterceptors } from '@/api/setup'

setupAPIAuthInterceptors()

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
