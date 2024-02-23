import React, { useEffect, useState } from "react";
import 'assets/styles/globals.css'
import { appWithTranslation } from 'next-i18next'
import App from 'next/app'
import { RecoilRoot } from 'recoil'
import { DefaultSeo } from 'next-seo'
import RecoilOutsideComponent from 'src/infrastructure/common/libs/recoil-outside/Service'
import CookieService from "src/infrastructure/services/CookieService";
import Head from "next/head";
import Link from "next/link";
import favicon from "public/favicon.ico";

const QLHSSystemAdminApp = ({ Component, pageProps }) => {

  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
    return () => {
      window.removeEventListener('online', () => setIsOnline(true));
      window.removeEventListener('offline', () => setIsOnline(false));
    }
  }, []);

  console.log('isOnline', isOnline);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js', { scope: '/' })
        .then((registration) => {
          console.log(
            'Service worker registered successfully. Scope:',
            registration.scope
          );
        })
        .catch((error) => {
          console.error('Service worker registration failed:', error);
        });
    }
  }, []);

  return (
    <RecoilRoot>
      <RecoilOutsideComponent />
      <DefaultSeo />
      <Head>
        <link rel="icon" href={favicon.src} />
      </Head>
        <Component {...pageProps} />
        {
          !isOnline && <div className="offline">
            <p>Không có kết nối internet</p>
          </div>
        }
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
      user: { ...cookie },
    },
  }
}

export default appWithTranslation(QLHSSystemAdminApp);


