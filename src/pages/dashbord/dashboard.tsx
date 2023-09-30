import React, { useEffect } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { MenuKeys } from "src/core/domain/enums/MenuKeys";
import { Button, Col, Row } from "antd";
import { NextSeo } from "next-seo";

const DashBoardPage = ({ context }) => {
  const router = useRouter();

  return (
    <>
    <NextSeo title="Dashbord" description="Dashbord" />
    <Row justify={"space-between"}>
      <Col className="page-name">
        Dashbord
      </Col>
      <Col>
        <Button>ADD ITEM</Button>
      </Col>
    </Row>
    </>
  );
};

export default DashBoardPage;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      defaultSelectedKeys: [MenuKeys.Dashboard],
      openKeys: [],
    },
  };
}
