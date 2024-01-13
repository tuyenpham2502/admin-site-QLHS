import { Button, Col, Row, Upload } from "antd";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import { MenuKeys } from "src/core/domain/enums/MenuKeys";
import MainLayout from "src/infrastructure/common/layout/MainLayout";
import styles from "assets/styles/pages/pages/add-item.module.css"
import UploadFile from "./form/uploadFile";


const AddItem = (context) => {

    const t = useTranslation("common");

    return (
        <MainLayout context={context} translator={t}>
            <NextSeo title="Add item" description="Add item" />
            <Row justify={"space-between"} align={"middle"} className={"header-page"}>
                <Col className="page-name">
                    AddItem
                </Col>
            </Row>
            <div className={styles.add_item_form}>
                <Row>
                    <Col xxl={4} xl={4} lg={6} md={6} sm={24} xs={24} >
                        <UploadFile context={context} />
                    </Col>
                </Row>

            </div>
        </MainLayout>
    )
};

export default AddItem;

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            defaultSelectedKeys: [MenuKeys.AddItem],
            openKeys: [MenuKeys.Pages],
        },
    };
}
