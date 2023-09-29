import Document, { Html, Head, Main, NextScript } from 'next/document'

class QLHSSystemAdminApp extends Document {

  static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx);
        return {...initialProps}
    }

  render() {
    return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="favicon/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
    )
  }
}

export default QLHSSystemAdminApp