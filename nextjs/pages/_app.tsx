import '../styles/globals.css'
import type { AppProps } from 'next/app';
import { ProvideAuth } from '../utils/auth/auth';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth>
      <Component {...pageProps} />
    </ProvideAuth>
  );
}
export default MyApp
