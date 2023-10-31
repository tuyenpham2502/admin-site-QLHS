import { Button, Col, Row } from "antd";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import { MenuKeys } from "src/core/domain/enums/MenuKeys";
import MainLayout from "src/infrastructure/common/layout/MainLayout";



const ListUser = (context) => {

    const t = useTranslation("common");

    return (
        <MainLayout context={context} translator={t}>
            <NextSeo title="Edit user" description="Edit user" />
            <Row justify={"space-between"}>
                <Col className="page-name">
                    list user
                </Col>
                <Col>
                    <Button>List user</Button>
                </Col>
            </Row>
        </MainLayout>
    )
};

export default ListUser;

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common"])),
            defaultSelectedKeys: [MenuKeys.Users],
            openKeys: [],
        },
    };
}
