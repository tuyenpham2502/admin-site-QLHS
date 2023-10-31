import React, { useEffect } from "react";
import { EyeOutlined, AppstoreAddOutlined, CommentOutlined, StarOutlined, BarChartOutlined, AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { MenuKeys } from "src/core/domain/enums/MenuKeys";
import { Button, Col, Divider, Row } from "antd";
import { NextSeo } from "next-seo";
import { HeaderPage } from "src/infrastructure/common/components/controls/headerPage";
import { StatItem } from "src/infrastructure/common/components/dashboard/stat-item";
import styles from "assets/styles/pages/dashboard/dashboard.module.css";
import { TableItem } from "src/infrastructure/common/components/dashboard/table-item";
const DashBoardPage = ({ context }) => {
  const router = useRouter();

  return (
    <>
      <NextSeo title="Dashbord" description="Dashbord" />
      <HeaderPage
        titlePage="Dashboard"
        rightItem={
          <Button size="large" type="primary" className="app-button" shape="round" onClick={() => router.push("/pages/add-item")}>ADD ITEM</Button>
        }
      />
      <Row gutter={[15, 15]} className={styles.stat_items_wrapper}>
        <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
          <StatItem title="Unique views this month" data={123} icon={<EyeOutlined className={styles.stat_icon} />} />
        </Col>
        <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
          <StatItem title="Items added this month" data={123} icon={<AppstoreAddOutlined className={styles.stat_icon} />} />
        </Col>
        <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
          <StatItem title="New comments" data={123} icon={<CommentOutlined className={styles.stat_icon} />} />
        </Col>
        <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
          <StatItem title="New reviews" data={123} icon={<StarOutlined className={styles.stat_icon} />} />
        </Col>
        </Row>
        <Row gutter={[15,15]} className={styles.stat_items_wrapper}>
          <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
            <TableItem title="Top items" data={123} icon={<BarChartOutlined className={styles.table_icon} />} />
          </Col>
          <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
            <TableItem title="Latest items" data={123} icon={<AppstoreOutlined className={styles.table_icon} />} />
          </Col>
          <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
            <TableItem title="Latest users" data={123} icon={<UserOutlined className={styles.table_icon} />} />
          </Col>
          <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
            <TableItem title="Latest reviews" data={123} icon={<StarOutlined className={styles.table_icon} />} />
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
