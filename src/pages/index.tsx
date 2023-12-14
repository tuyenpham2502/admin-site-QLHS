import DashBoardPage from 'src/pages/dashbord/dashboard'
import MainLayout from 'src/infrastructure/common/layout/MainLayout'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MenuKeys } from 'src/core/domain/enums/MenuKeys'
import { useTranslation } from 'next-i18next'
import { NextSeo } from 'next-seo'

export default function Home(context: any) {

  const t = useTranslation('common');

  return (
    <>
      <NextSeo title="Dashbord" description="Dashbord" />

      <MainLayout context={context} translator={t}>
        <div style={{ background: '#ecf2fb', borderRadius: "5px" }}>
          <DashBoardPage context={context}  />
        </div>
      </MainLayout>
    </>
  )
}

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      defaultSelectedKeys: [MenuKeys.Dashboard],
      openKeys: [],
    },
  };
}
