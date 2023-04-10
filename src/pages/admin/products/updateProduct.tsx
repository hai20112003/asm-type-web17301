import { Button, Form, Input, InputNumber, Select, Upload } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { IProduct } from "../../../interface/product";
import { ICategory } from '../../../interface/category';

interface Props {
  products: IProduct[];
  category: ICategory[];
  onUpdate: (product: IProduct) => void;
}
interface Option {
  value: string;
  label: string;
}
const UpdateProduct = (props: Props) => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<ICategory[]>([]);
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    const currentProduct = props.products.find(
      (product: IProduct) => product._id == id
    );
    setProduct(currentProduct);
    setData(props.category);
  }, [props]);

  useEffect(() => {
    setData(props.category);
  }, [props]);
  useEffect(() => {
    setFields();
  }, [product, data]);

  const setFields = () => {
    form.setFieldsValue({
      _id: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.image,
      description: product?.description,
      categoryID: product?.categoryId,
    });
  };

  const onFinish = (value: IProduct) => {
    if (typeof value.categoryId === "undefined") {
      value.categoryId = product?.categoryId || "";
    }
    // value.image = base64Image || "";
    props.onUpdate(value);
    navigate("/admin/products");
    // console.log(value);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed", errorInfo);
  };

  // function convertDataToOptions(data: ICategory[]): Option[] {
  //   return data.map((item) => ({
  //     value: item._id,
  //     label: item.name,
  //   }));
  // }
  // const options: Option[] = convertDataToOptions(data);

  // const [base64Image, setBase64Image] = useState<string | null>(null);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = () => {
  //       setBase64Image(reader.result as string);
  //     };
  //     reader.onerror = (error) => {
  //       console.error("Error converting image to Base64:", error);
  //     };
  //   }
  // };

  return (
    <>
      <h3 className='text-black text-[30px]'>Sửa</h3>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
      >
        <Form.Item label="Id" name="_id" style={{ display: "none" }}>
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="Price" name="price">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Upload" name="image">
          {/* <Upload action="/upload.do" listType="picture-card">
          <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        </Upload> */}
          <Input />
          {/* <input type="file" accept="image/*" onChange={handleImageChange} /> */}
          {/* {base64Image && <img src={base64Image} alt="Converted to Base64" />} */}
        </Form.Item>
        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item label="Select" name="categoryId">
          {product?.categoryId && (
            <Select defaultValue={product.categoryId}>
              {data.map((category) => {
                return (
                  <Select.Option key={category._id} value={category._id}>
                    {category.name}
                  </Select.Option>
                );
              })}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit">Sửa</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default UpdateProduct;
