import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import globalStyles from '@styles/global';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyles} />
      <Component {...pageProps} />
    </>
  );
}
