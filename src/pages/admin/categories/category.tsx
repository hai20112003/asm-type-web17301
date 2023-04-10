import { Button, Input, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { ICategory, IPropsCate } from "../../../interface/category";

import type { ColumnsType } from "antd/es/table";
const { Search } = Input;
const AdminCategory = (props: IPropsCate) => {
  const removeCategory = (id: string) => {
    props.onRemoveCate(id);
  };

  const columns: ColumnsType<ICategory> = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space wrap>
          <Button style={{ background: "#1677ff", color: "white" }}>
            {" "}
            <Link to={`/admin/categories/${record._id}/update`}>
              Update
            </Link>{" "}
          </Button>
          <Button
            style={{ background: "rgb(220 38 38)", color: "white" }}
            type="primary"
            onClick={() => {
              let text = "Bạn có chắc chắn muốn xóa không!";
              if (confirm(text) === true) {
                removeCategory(record._id);
              }
            }}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  const [data, setData] = useState<ICategory[]>([]);

  const onSearch = (value: string) => {
    const searchProduct = props.category.filter((category) =>
      category.name.toLowerCase().includes(value.toLowerCase())
    );
    setData(searchProduct);
  };

  useEffect(() => {
    setData(props.category);
  }, [props]);

  return (
    <>
      <Space
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          columnGap: "20px",
        }}
      >
        <Button className="bg-[#1677ff]" type="primary">
          <Link to={"/admin/categories/add"}>+ Add Category</Link>
        </Button>
        <Space direction="vertical">
          <Search
            className="bg-[#1677ff] rounded-md"
            placeholder="input search text"
            onSearch={onSearch}
            enterButton
          />
        </Space>
      </Space>
      <h3 className='text-black text-[30px]'>Danh sách</h3>

      <Table
        style={{
          border: "1px solid rgb(156 163 175)",
          borderRadius: "18px",
          padding: "5px",
          marginTop: "20px",
        }}
        columns={columns}
        dataSource={data}
      />
    </>
  );
};

export default AdminCategory;
