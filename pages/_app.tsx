import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { useSession } from '@/hooks/session'
import { store } from '@/store'
import { setupAPIAuthInterceptors } from '@/api/setup'
import WithNavbar from '@/components/layouts/WithNavbar';
import { RequireLoggedIn } from '@/components/guards/RequireLoggedIn'
import '@/styles/globals.css'

function MyApp(appProps: AppProps) {
  const { getToken, logout } = useSession()

  setupAPIAuthInterceptors(getToken, logout);

  return <>
    <Provider store={store}>
      <WithNavbar>
        <RequireLoggedIn {...appProps} />
      </WithNavbar>
    </Provider>
  </>
}

export default MyApp;
