import { Col, Row, Table, Tag } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import styles from "assets/styles/pages/dashboard/dashboard.module.css";
import DashboardTable from "../table/table-dashboard";
import Constant from "src/core/application/common/Constants";
type Props = {
  title: string;
  icon?: any;
  onClickReload?: () => void;
  data?: any;
  type?: string;
  isLoading?: boolean;
};

const TableItem = (props: Props) => {
  const { title, icon, onClickReload, data, type, isLoading } = props;

  const local = {
    emptyText: (
      <div>
        <p>No data</p>
      </div>
    ),
  };

  return (
    <div className={styles.table_item}>
      <Row
        justify={"space-between"}
        align={"middle"}
        className={styles.header_table_item}
      >
        <Col>
          <Row gutter={[10, 0]} align={"middle"}>
            <Col>{icon}</Col>
            <Col className={styles.table_title}>{title}</Col>
          </Row>
        </Col>
        <Col>
          <Row gutter={[16, 0]} align={"middle"}>
            <Col className={styles.table_value}>
              <ReloadOutlined
                className={styles.reload_icon}
                onClick={onClickReload}
              />
            </Col>
            <Col>
              <Tag color="black" className={styles.table_tag_view_all}>
                View All
              </Tag>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <DashboardTable data={data} isLoading={isLoading} type={type} />
      </Row>
    </div>
  );
};

export default TableItem;