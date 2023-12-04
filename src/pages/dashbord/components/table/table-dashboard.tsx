import { Spin, Table } from "antd";
import { ColumnType } from "antd/es/table";
import { StarOutlined } from "@ant-design/icons";
import styles from "assets/styles/pages/dashboard/dashboard.module.css";
import Constant from "src/core/application/common/constants";

interface DataType {
  id: string;
  title: string;
  category: string;
  rating: string;
  status: string;
  fullName: string;
  email: string;
  username: string;
  item: string;
}

type Props = {
  data: any;
  isLoading?: boolean;
  type: string;
};

const DashboardTable = (props: Props) => {
  const { data, isLoading, type } = props;

  const columns = () => {
    switch (type) {
      case Constant.DashBoardTableItemsType.TopItems:
        return [
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
            title: "CATEGORY",
            dataIndex: "filmType",
            key: "filmType",
          },
          {
            title: "RATING",
            dataIndex: "rating",
            key: "rating",
            render: (rate: number) => {
              return (
                <div>
                  <StarOutlined  className={styles.table_star_rating}/>
                  <span className={styles.table_star_rating_value}>{rate}</span>
                </div>
              );
            },
          },
        ];
      case Constant.DashBoardTableItemsType.LatestItems:
        return [
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
            title: "CATEGORY",
            dataIndex: "filmType",
            key: "filmType",
          },
          {
            title: "STATUS",
            dataIndex: "isShowing",
            key: "isShowing",
            render: (isShowing: boolean) => {
              return isShowing ? "Visible" : "Hidden";
            },
          },
        ];
      case Constant.DashBoardTableItemsType.LatestUsers:
        return [
          {
            title: "NAME",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "EMAIL",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "USER ID",
            dataIndex: "userId",
            key: "userId",
          },
        ];
    }
  };

  return (
    <div className="dashboard-table-wrapper">
      <Table
        columns={columns()}
        style={{ width: "100%" }}
        dataSource={data || []}
        loading={isLoading}
        pagination={false}
        scroll={{ x: true}}
      />
    </div>
  );
};

export default DashboardTable;