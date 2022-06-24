import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useSession } from '@/hooks/session'
import { store } from '@/store'
import { ejectInterceptors, setupAPIAuthInterceptors } from '@/api/setup'
import { RequireLoggedIn } from '@/components/guards/RequireLoggedIn'
import '@/styles/globals.css'
import { useEffect } from 'react'

function MyApp(appProps: AppProps) {
  const { getToken, logout } = useSession()

  useEffect(()=> {
    const [reqInterceptor, resInterceptor] = setupAPIAuthInterceptors(getToken, logout)
    return () => ejectInterceptors(reqInterceptor, resInterceptor)
  }), []

  return <>
    <Provider store={store}>
        <RequireLoggedIn {...appProps} />
    </Provider>
  </>
}

export default MyApp
