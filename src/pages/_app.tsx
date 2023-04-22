import type { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '@/components/layout';
import GlobalStyle from '@/styles/global-styles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>AI Chat Room</title>
      </Head>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
