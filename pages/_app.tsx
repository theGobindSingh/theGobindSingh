import { queryClient } from '@/clients/query';
import { fullName, homeHeroData } from '@data';
import { Global } from '@emotion/react';
import globalStyles from '@styles/global';
import { QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';

const { titlePostfix, text } = homeHeroData;

const App = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Head>
      <title>{`${fullName} | Portfolio`}</title>
      <meta
        name="description"
        content={`${fullName} | Portfolio | ${titlePostfix} ${text}`}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="shortcut icon"
        href="/assets/images/among.png"
        type="image/x-icon"
      />
    </Head>
    <Global styles={globalStyles} />
    <Component {...pageProps} />
  </QueryClientProvider>
);

export default App;
