import type { DocumentContext } from 'next/document';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <link rel="shortcut icon" href="/assets/images/numble.svg" />
          <link rel="apple-touch-icon" href="/assets/images/numble.svg" />

          <meta name="description" content="AI Chat Room" />
          <meta name="og:title" content="AI Chat Room" />
          <meta name="og:description" content="AI Chat Room" />
          <meta name="og:image" content="/assets/images/numble.svg" />
          <meta name="og:url" content="https://numble.vercel.app" />
          <meta name="og:type" content="website" />
          <meta name="og:site_name" content="AI Chat Room" />
          <meta name="og:locale" content="ko_KR" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:title" content="AI Chat Room" />
          <meta name="twitter:description" content="AI Chat Room" />
          <meta name="twitter:image" content="/assets/images/numble.svg" />
          <meta name="twitter:url" content="https://numble.vercel.app" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
