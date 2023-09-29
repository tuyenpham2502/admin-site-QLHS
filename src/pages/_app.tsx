import React from "react";
import 'assets/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import App from 'next/app'
import { RecoilRoot } from 'recoil'
import { DefaultSeo } from 'next-seo'
import RecoilOutsideComponent from 'src/infrastructure/common/libs/recoil-outside/Service'

const QLHSSystemAdminApp = ({ Component, pageProps }) => {
  
  return (
      <RecoilRoot>
          <RecoilOutsideComponent />
          <DefaultSeo />
          <Component {...pageProps} />
      </RecoilRoot>
  )

}

QLHSSystemAdminApp.getInitialProps = async (appContext: any) => {
  const appProps = await App.getInitialProps(appContext);
  return {
      pageProps: {
          ...appProps.pageProps,
          
      },
  }
}

export default appWithTranslation(QLHSSystemAdminApp);


