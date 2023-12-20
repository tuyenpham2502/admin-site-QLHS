import React, { useState, useEffect } from "react";
import {
  EyeOutlined,
  AppstoreAddOutlined,
  CommentOutlined,
  StarOutlined,
  BarChartOutlined,
  AppstoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { MenuKeys } from "src/core/domain/enums/MenuKeys";
import { Button, Col, Divider, Row } from "antd";
import StatItem from "src/pages/dashbord/components/items/stat-item";
import styles from "assets/styles/pages/dashboard/dashboard.module.css";
import TableItem from "src/pages/dashbord/components/items/table-item";
import { getTopFilmsAsync } from "src/infrastructure/dashboard/effect/getDashboardEfffect";
import Constant from "src/core/application/common/constants";

const DashBoardPage = ({ context }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [topFilms, setTopFilms] = useState([]);

  const getTopFilms = async () => {
    await getTopFilmsAsync(
      {},
      {
        sort: "ASC"
      },
      setTopFilms,
      setIsLoading
    );
  };
  useEffect(() => {
    getTopFilms();
  }, []);

  return (
    <>
      <Row justify={"space-between"} align={"middle"} className={"header-page"}>
            <Col className="page-name">
                Dashboard
            </Col>
            <Col>
                <Button
            size="large"
            type="primary"
            className="app-button"
            shape="round"
            onClick={() => router.push("/pages/add-item")}
          >
            ADD ITEM
          </Button>
            </Col>
        </Row>
      
      <Row gutter={[15, 15]} className={styles.stat_items_wrapper}>
        <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
          <StatItem
            title="Unique views this month"
            data={123}
            icon={<EyeOutlined className={styles.stat_icon} />}
          />
        </Col>
        <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
          <StatItem
            title="Items added this month"
            data={123}
            icon={<AppstoreAddOutlined className={styles.stat_icon} />}
          />
        </Col>
        <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
          <StatItem
            title="New comments"
            data={123}
            icon={<CommentOutlined className={styles.stat_icon} />}
          />
        </Col>
        <Col xxl={6} xl={6} lg={12} md={12} sm={24} xs={24}>
          <StatItem
            title="New reviews"
            data={123}
            icon={<StarOutlined className={styles.stat_icon} />}
          />
        </Col>
      </Row>
      <Row gutter={[15, 15]} className={styles.stat_items_wrapper}>
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          <TableItem
            title="Top items"
            icon={<BarChartOutlined className={styles.table_icon} />}
            onClickReload={getTopFilms}
            data={topFilms}
            type={Constant.DashBoardTableItemsType.TopItems}
            isLoading={isLoading}
          />
        </Col>
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          <TableItem
            title="Latest items"
            icon={<AppstoreOutlined className={styles.table_icon} />}
            data={topFilms}
            type={Constant.DashBoardTableItemsType.LatestItems}
            isLoading={isLoading}
          />
        </Col>
        <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          <TableItem
            title="Latest users"
            icon={<UserOutlined className={styles.table_icon} />}
            data={topFilms}
            type={Constant.DashBoardTableItemsType.LatestUsers}
            isLoading={isLoading}
          />
        </Col>
        {/* <Col xxl={12} xl={12} lg={24} md={24} sm={24} xs={24}>
          <TableItem
            title="Latest reviews"
            icon={<StarOutlined className={styles.table_icon} />}
            data={topFilms}
            type={Constant.DashBoardTableItemsType.LatestReviews}
            isLoading={isLoading}
          />
        </Col> */}
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
