import { Col, Row, Spin, Table } from "antd";
import { ColumnType } from "antd/es/table";
import {
  StarOutlined,
  LockOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styles from "assets/styles/pages/catalog/list.module.css";

interface DataType {
  id: string;
  title: string;
  rating: string;
  category: string;
  views: string;
  status: string;
  createDate: string;
  actions: string;
}

type Props = {
  data: any;
  isLoading?: boolean;
  type: string;
};

const CatalogTable = (props: Props) => {
  const { data, isLoading, type } = props;

  const columns = (): ColumnType<DataType>[] => [
    {
      title: "ID",
      dataIndex: "filmId",
      key: "filmId",
    },
    {
      title: "TITLE",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "RATING",
      dataIndex: "rating",
      key: "rating",
      render: (rate: number) => {
        return (
          <div>
            <StarOutlined className={styles.table_star_rating} />
            <span className={styles.table_star_rating_value}>{rate}</span>
          </div>
        );
      },
    },
    {
      title: "CATEGORY",
      dataIndex: "filmType",
      key: "filmType",
    },
    {
      title: "VIEWS",
      dataIndex: "views",
      key: "views",
    },
    {
      title: "STATUS",
      dataIndex: "isShowing",
      key: "isShowing",
      render: (isShowing: boolean) => {
        return isShowing ? (
          <div className={styles.table_status_visible}>Visible</div>
        ) : (
          <div className={styles.table_status_hidden}>Hidden</div>
        )
      },
    },
    {
      title: "CREATE DATE",
      dataIndex: "createDate",
      key: "createDate",
    },
    {
      title: "ACTIONS",
      dataIndex: "actions",
      key: "actions",
      width: 200,
      render: (actions: string) => {
        return (
          <Row className={styles.action_item_wrapper}>
            <Col className={styles.action_item}>
              <LockOutlined style={{ color: "#29b474", fontSize: "16px" }} />
            </Col>
            <Col className={styles.action_item}>
              <EyeOutlined style={{ color: "#ffc312", fontSize: "16px" }} />
            </Col>
            <Col className={styles.action_item}>
              <EditOutlined style={{ color: "#2f80ed", fontSize: "16px" }} />
            </Col>
            <Col className={styles.action_item}>
              <DeleteOutlined style={{ color: "#eb5757", fontSize: "16px" }} />
            </Col>
          </Row>
        );
      },
    },
  ];

  return (
    <div className="catalog-table-wrapper">
      <Table
        columns={columns()}
        style={{ width: "100%" }}
        dataSource={data || []}
        loading={isLoading}
        pagination={false}
      />
    </div>
  );
};

export default CatalogTable;
