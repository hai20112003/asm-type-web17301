import { Button, Form, Input, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";

import { login } from "../../api/auth";

type Props = {};

const Signin = (props: Props) => {
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    const { data: user } = await login(values);
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="bg-white w-full min-h-[75vh] pt-9">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, color: "white", width: "70%", margin: "auto"}}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          style={{ color: "white" }}
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{backgroundColor: "#1677ff"}}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Space style={{display: "flex", justifyContent: "center"}}>
        Bạn chưa có tài khoản ? <Link to={"/signup"}>Signup</Link>
      </Space>
    </div>
  );
};

export default Signin;
