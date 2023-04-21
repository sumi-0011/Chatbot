import type { AppProps } from 'next/app';

import Layout from '@/components/layout';
import GlobalStyle from '@/styles/global-styles';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
