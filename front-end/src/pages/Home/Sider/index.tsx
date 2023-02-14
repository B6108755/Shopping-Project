import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ShopOutlined,
  ShoppingOutlined,
  SolutionOutlined,
  UserOutlined,
  TagsOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

type Props = {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
};

const CSider = ({ collapsed, setCollapsed }: Props) => {
  const navigate = useNavigate();
  const userManu = [
    {
      key: "products",
      icon: <ShopOutlined />,
      label: "สินค้า",
    },
    {
      key: "status",
      icon: <TagsOutlined />,
      label: "คำสั่งซื้อ",
    },
    {
      key: "management",
      icon: <UserOutlined />,
      label: "จัดการผู้ใช้",
    },
    {
      key: "report",
      icon: <SolutionOutlined />,
      label: "แจ้งปัญหา",
      children: [
        {
          key: "report-product",
          icon: <ShoppingOutlined />,
          label: "สินค้า",
        },
        {
          key: "contact",
          icon: <PhoneOutlined rotate={90} />,
          label: "ติดต่อเรา",
        },
      ],
    },
  ];

  return (
    <React.Fragment>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => {
          setCollapsed(!collapsed);
        }}
        theme="light"
        className="!bg-gray-100"
      >
        <div className=" h-8 m-4 text-center bg-orange-400 rounded-md text-white "></div>
        <Menu
          theme="light"
          mode="inline"
          className="!bg-gray-100"
          defaultSelectedKeys={["home"]}
          onClick={(e) => {
            navigate(`home/${e.key}`);
          }}
          items={userManu}
        />
      </Sider>
    </React.Fragment>
  );
};

export default CSider;
