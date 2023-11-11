import { useEffect, useState } from "react";
import { Button, Col, Row } from "antd";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import { MenuKeys } from "src/core/domain/enums/MenuKeys";
import MainLayout from "src/infrastructure/common/layout/MainLayout";
import styles from "assets/styles/pages/catalog/list.module.css";
import { formatTotalCatalog } from "src/infrastructure/helpers";
import CatalogTable from "../comments/table/table-catalog";
import { getTopFilmsAsync } from "src/infrastructure/dashboard/effect/getDashboardEfffect";
import Constant from "src/core/application/common/constants";

const CatalogPage = (context) => {
  const [isLoading, setIsLoading] = useState(false);
  const [topFilms, setTopFilms] = useState([]);
  const t = useTranslation("common");

  const getTopFilms = async () => {
    await getTopFilmsAsync(
      {},
      {
        sort: "ASC",
      },
      setTopFilms,
      setIsLoading
    );
  };

  useEffect(() => {
    getTopFilms();
  }, []);

  return (
    <MainLayout context={context} translator={t}>
      <NextSeo title="Catalog" description="Catalog" />
      <Row className={"header-page"}>
        <Col className="page-name">Catalog</Col>
        <Col className={styles.list_total}>
          {formatTotalCatalog(12344234)} total
        </Col>
      </Row>
      <Row>
        <CatalogTable data={topFilms} type={Constant.DashBoardTableItemsType.TopItems} />
      </Row>
    </MainLayout>
  );
};

export default CatalogPage;

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      defaultSelectedKeys: [MenuKeys.Catalog],
      openKeys: [],
    },
  };
}
