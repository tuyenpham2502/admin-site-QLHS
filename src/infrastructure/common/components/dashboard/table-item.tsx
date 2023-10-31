import { Col, Row, Table, Tag } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import styles from "assets/styles/pages/dashboard/dashboard.module.css"
type Props = {
    title: string;
    data: number;
    icon?: any;
}

export const TableItem = (props: Props) => {

    const { title, data, icon } = props;


    const local = {
        emptyText: (
            <div style={{
                backgroundColor: "#131720",
            }}>
                <p>No data</p>
            </div>
        )
    }

    return (
        <div className={styles.table_item}>
            <Row justify={"space-between"} align={"middle"} className={styles.header_table_item}>
                <Col>
                    <Row gutter={[10,0]} align={"middle"}>
                        <Col>
                            {icon}
                        </Col>
                        <Col className={styles.table_title}>
                            {title}
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <Row gutter={[16,0]} align={"middle"}>
                        <Col className={styles.table_value}>
                            <ReloadOutlined className={styles.reload_icon}/>
                        </Col>
                        <Col>
                            <Tag color="black" className={styles.table_tag_view_all}>View All</Tag>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Table style={{width:"100%"}} locale={local} />

            </Row>
        </div>
    )
}