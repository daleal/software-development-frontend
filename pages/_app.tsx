import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useSession } from '@/hooks/session'
import { store } from '@/store'
import { setupAPIAuthInterceptors } from '@/api/setup'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  const { getToken } = useSession()

  setupAPIAuthInterceptors(getToken)

  return <>
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  </>
}

export default MyApp
