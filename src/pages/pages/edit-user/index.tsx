import { Button, Col, Row } from "antd";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import { MenuKeys } from "src/core/domain/enums/MenuKeys";
import MainLayout from "src/infrastructure/common/layout/MainLayout";



const EditUser = (context) => {

    const t = useTranslation("common");

    return (
        <MainLayout context={context} translator={t}>
            <NextSeo title="Edit user" description="Edit user" />
            <Row justify={"space-between"}>
                <Col className="page-name">
                    EditUser
                </Col>
                <Col>
                    <Button>ADD ITEM</Button>
                </Col>
            </Row>
        </MainLayout>
    )
};

export default EditUser;

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            defaultSelectedKeys: [MenuKeys.EditUser],
            openKeys: [MenuKeys.Pages],
        },
    };
}
