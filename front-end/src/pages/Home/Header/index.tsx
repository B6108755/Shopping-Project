import { Avatar, Button, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cart from "../../../mock/cartt.json";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useUser } from "../../../context/auth";
import { baseURL } from "../../../api/api";
import { useCart } from "../../../context/cart";
import { refreshPage } from "../../Management";

type Props = {
  trigger: (v: any) => void;
};

export interface User {
  id?: number;
  username?: string;
  password?: string;
  Role?: string;
  address: string;
}
const CHeader = ({ trigger }: Props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<User>();
  const { user, userDetail, setUser } = useUser();
  let data = user || "";

  useEffect(() => {
    if (data.username) {
      fetchData();
    }
  }, [data]);

  const fetchData = () => {
    baseURL.get(`/api/users/${data.username}`).then((res) => {
      setUsername(res.data);
    });
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <div className="font-bold">{`${username?.username} (${username?.Role})`}</div>
      ),
      key: "0",
      disabled: true,
    },

    {
      type: "divider",
    },
    {
      label: (
        <div
          className="text- flex items-center gap-2 !h-[25px]"
          onClick={() => {
            navigate("/login");
            refreshPage();
          }}
        >
          Logout
        </div>
      ),
      key: "",
    },
  ];
  return (
    <React.Fragment>
      <Header className="site-layout-background w-full flex justify-between">
        <div className="text-[#123265] font-bold xl:text-lg text-center items-center flex md:text-base">
          EVERYDAY fresh fruits
        </div>
        <div className=" flex">
          {userDetail?.Role === "Admin" ? (
            <></>
          ) : (
            <Button
              className="rounded-full h-9 w-9 relative px-2 my-auto"
              onClick={trigger}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>
              {/* <div
              className="text-xs rounded-full bg-red-500 flex justify-center items-center text-white w-5 h-5 absolute bottom-0 right-0"
              style={{ transform: "translate(25%, 25%)" }}
            >
              {numberTotal}
            </div> */}
            </Button>
          )}

          <div className=" border-r-2 pr-2 my-5 mx-2"></div>
          <Dropdown menu={{ items }} trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <div>
                <Avatar
                  size="large"
                  // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  // className=" mx-auto "
                  // src="https://joeschmoe.io/api/v1/random"
                  src="https://img.freepik.com/free-photo/colorful-fruits-tasty-fresh-ripe-juicy-white-desk_179666-169.jpg?w=2000"
                ></Avatar>
                <DownOutlined />
              </div>
            </a>
          </Dropdown>
        </div>
      </Header>
    </React.Fragment>
  );
};

export default CHeader;
