import { Global } from '@emotion/react';
import globalStyles from '@styles/global';
import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </>
);

export default App;
