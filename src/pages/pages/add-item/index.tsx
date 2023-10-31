import { Button, Col, Row } from "antd";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import { MenuKeys } from "src/core/domain/enums/MenuKeys";
import MainLayout from "src/infrastructure/common/layout/MainLayout";



const AddItem = (context) => {

    const t = useTranslation("common");

    return (
        <MainLayout context={context} translator={t}>
            <NextSeo title="Add item" description="Add item" />
            <Row justify={"space-between"}>
                <Col className="page-name">
                    AddItem
                </Col>
                <Col>
                    <Button>ADD ITEM</Button>
                </Col>
            </Row>
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
