import { Button, Checkbox, Flex, Space, Table, TableColumnsType } from "antd";
import {
  DownloadOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useState } from "react";
import { QuotaVM } from "../../utils/interfaces.ts";
import { DB_CONST } from "../../data/db.ts";

const tableColumns = (navigate: NavigateFunction): TableColumnsType => [
  {
    title: "Объект",
    dataIndex: "object",
  },
  {
    width: 120,
    title: "Дата выдачи",
    dataIndex: "created",
  },
  {
    width: 120,
    title: "Срок действия",
    dataIndex: "expired",
  },
  {
    width: 120,
    title: "Вид топлива",
    dataIndex: "gasType",
  },
  {
    width: 100,
    align: "center",
    title: "Номинал",
    dataIndex: "quantity",
  },
  {
    width: 100,
    align: "center",
    title: "Серия",
    dataIndex: "series",
  },
  {
    align: "center",
    title: "Номер",
    dataIndex: "number",
    sorter: (a, b) => a.number - b.number,
  },
  {
    align: "center",
    title: "Дата использования",
    dataIndex: "used",
    render: (value: string | null) => <div>{value ? value : ""}</div>,
  },
  {
    width: 100,
    align: "center",
    title: "Изменить",
    render: (record: QuotaVM) => (
      <Space>
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => navigate(`/quotas/${record.id!}`)}
        />
      </Space>
    ),
  },
  {
    width: 100,
    align: "center",
    title: "Талон",
    render: (record: QuotaVM) => (
      <Space>
        <Button
          type="text"
          icon={<DownloadOutlined />}
          onClick={() => {
            console.log(record);
          }}
        />
      </Space>
    ),
  },
];

const Quotas = () => {
  const navigate = useNavigate();
  // const { data, isLoading } = useGetQuotasQuery();
  const { quotas: data } = DB_CONST;

  const [hasUsed, setHasUsed] = useState(false);

  return (
    <div>
      <Flex
        dir={"row"}
        justify={"space-between"}
        align={"center"}
        style={{ padding: "0 16px" }}
      >
        <Button
          type="primary"
          onClick={() => navigate("/quotas/new")}
          icon={<PlusOutlined />}
        >
          Добавить
        </Button>
        <Checkbox
          value={hasUsed}
          onChange={(e) => setHasUsed(e.target.checked)}
        >
          Показать использованные
        </Checkbox>
      </Flex>
      <Table
        columns={tableColumns(navigate)}
        rowKey={"id"}
        tableLayout={"fixed"}
        className={"table"}
        pagination={{ position: ["bottomCenter"] }}
        dataSource={hasUsed ? data : data?.filter(({ used }) => !used)}
        // loading={isLoading}
        style={{ padding: 16 }}
      />
    </div>
  );
};

export default Quotas;
