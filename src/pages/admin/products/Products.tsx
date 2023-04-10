import { Button, Input, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IProduct, IProps } from "../../../interface/product";

import type { ColumnsType } from "antd/es/table";
const { Search } = Input;
const AdminProduct = (props: IProps) => {
  const removeProduct = (id: string) => {
    props.onRemove(id);
  };

  const columns: ColumnsType<IProduct> = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Image", dataIndex: "image", key: "image" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Space wrap className="flex justify-center">
          <Button style={{ background: "#1677ff", color: "white" }}>
            {" "}
            <Link to={`/admin/products/${record._id}/update`}>Update</Link>{" "}
          </Button>
          <Button
            style={{ background: "rgb(220 38 38)", color: "white" }}
            onClick={() => {
              let text = "Bạn có chắc chắn muốn xóa không ";
              if (confirm(text) === true) {
                removeProduct(record._id);
              }
            }}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  const [data, setData] = useState<IProduct[]>([]);

  const onSearch = (value: string) => {
    const searchProduct = props.products.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );
    setData(searchProduct);
  };

  useEffect(() => {
    setData(props.products);
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
          <Link to={"/admin/products/add"}>+ Add Products</Link>
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

export default AdminProduct;
