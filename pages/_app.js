import '../styles/main.scss'
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from '../lib/auth';

function MyApp({ Component, pageProps }) {

  return (
    <AuthProvider>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence >
    </AuthProvider>
  )
}

export default MyApp
