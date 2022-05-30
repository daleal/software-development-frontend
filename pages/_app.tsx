import type { AppProps } from 'next/app'
import { useSession } from '@/hooks/session'
import '@/styles/globals.css'
import { setupAPIAuthInterceptors } from '@/api/setup'
import { RequireLoggedIn } from '@/components/guards/RequireLoggedIn'

function MyApp(appProps: AppProps) {
  const { getToken } = useSession()

  setupAPIAuthInterceptors(getToken)

  return <RequireLoggedIn {...appProps} />
}

export default MyApp
