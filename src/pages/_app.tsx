import { SessionProvider } from "next-auth/react"
import "../app/globals.css"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify"
import { AppProps } from "next/app";
export default function App({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <ToastContainer />
    </SessionProvider>
  )
}