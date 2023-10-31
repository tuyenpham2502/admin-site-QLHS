import { Col, Row } from "antd";
import styles from "assets/styles/pages/dashboard/dashboard.module.css"
type Props = {
    title: string;
    data: number;
    icon?: any;
}
export const StatItem = (props: Props) => {

    const { title, data, icon } = props;
    return (
        <div className={styles.stat_item}>
            <div className={styles.stat_title}>
                {title}
            </div>
            <Row justify={"space-between"} align={"middle"}>
                <Col className={styles.stat_value}>
                    {data}
                </Col>
                <Col>
                    {icon}
                </Col>
            </Row>
        </div>
    )

}