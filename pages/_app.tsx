import type { AppProps } from "next/app";
import { useSession } from "@/hooks/session";
import "@/styles/globals.css";
import { setupAPIAuthInterceptors } from "@/api/setup";
import WithNavbar from "@/components/layouts/WithNavbar";

function MyApp({ Component, pageProps }: AppProps) {
  const { getToken } = useSession();

  setupAPIAuthInterceptors(getToken);

  return (
    <WithNavbar>
      <Component {...pageProps} />
    </WithNavbar>
  );
}

export default MyApp;
