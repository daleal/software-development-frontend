import type { AppProps } from 'next/app'
import { useSession } from '@/hooks/session'
import '@/styles/globals.css'
import { setupAPIAuthInterceptors } from '@/api/setup'
import { ApiProvider } from '@reduxjs/toolkit/query/react'
import { toolListingApi } from './api/toolListing'

function MyApp({ Component, pageProps }: AppProps) {
  const { getToken } = useSession()

  setupAPIAuthInterceptors(getToken)

  return (
    <ApiProvider api={toolListingApi}>
      <Component {...pageProps} />
    </ApiProvider>
  )
}

export default MyApp
