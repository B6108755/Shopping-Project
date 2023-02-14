import React, { useState } from "react";
import { Layout } from "antd";
import "./index.css";
import DrawerCart from "../../components/drawerCart";
import CSider from "./Sider";
import CHeader from "./Header";
import CContentRoutes from "./Content";
type Props = {};

const HomePage = (props: Props) => {
  const { Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const trigger = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <Layout className=" h-full !bg-transparent">
        <CSider collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout className="site-layout">
          <CHeader trigger={trigger} />
          <Content className="p-5 overflow-y-auto">
            <CContentRoutes />
          </Content>
        </Layout>
      </Layout>
      <DrawerCart open={open} trigger={trigger} />
    </React.Fragment>
  );
};

export default HomePage;
