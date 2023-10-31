import { Button, Col, Row } from "antd";
import { useTranslation } from "react-i18next";

type Props = {
    titlePage: string,
    rightItem?: any
}

export const HeaderPage = (props:Props) => {
    const {
        titlePage,
        rightItem
    } = props;


    return (
        <Row justify={"space-between"} align={"m"} className={"header-page"}>
            <Col className="page-name">
                {titlePage}
            </Col>
            <Col>
                {rightItem? rightItem : null}
            </Col>
        </Row>
    )

}