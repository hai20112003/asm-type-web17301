import { Image, Layout, Menu, theme } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider: Sided } = Layout;

const LayoutAdmin = () => {
  const navigate = useNavigate();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, [localStorage.getItem("user")]);
  return (
    <>

      <Layout style={{ minHeight: "100vh", margin: 0 }}>
        <Sided>
          <Link
            to={"/"}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Image
              preview={false}
              style={{
                paddingTop: "10px",
                paddingBottom: "10px",
                width: "100px",
                height: "100%",
                // margin: "auto",
              }}
              src="https://res.cloudinary.com/dqqfnp0hk/image/upload/v1680671104/z4239361379635_4129db4f9f404aafcf286b62bfb88052_yuymyk.png"
            />
          </Link>
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            <Menu.Item key={1}>
              <Link to={"/admin"}>Dashboard</Link>
            </Menu.Item>
            <Menu.Item key={2}>
              <Link to={"/admin/products"}>Product</Link>
            </Menu.Item>
            <Menu.Item key={3}>
              <Link to={"/admin/categories"}>Categories</Link>
            </Menu.Item>
          </Menu>
        </Sided>
        <Layout className="site-layout">
          <Header style={{ padding: 0, background: colorBgContainer }} />
          <Content style={{}}>
            <div
              style={{
                padding: 24,
                minHeight: "100%",
                background: colorBgContainer,
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2023 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutAdmin;
