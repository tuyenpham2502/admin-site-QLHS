import React from "react";
import 'assets/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import App from 'next/app'
import { RecoilRoot } from 'recoil'
import { DefaultSeo } from 'next-seo'
import RecoilOutsideComponent from 'src/infrastructure/common/libs/recoil-outside/Service'
import CookieService from "src/infrastructure/services/CookieService";

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
  let cookieService = new CookieService();
  let cookie = cookieService.readCookie(appContext.ctx);
  return {
      pageProps: {
          ...appProps.pageProps,
          user: {...cookie},
      },
  }
}

export default appWithTranslation(QLHSSystemAdminApp);


