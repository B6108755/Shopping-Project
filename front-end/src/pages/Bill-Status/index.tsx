import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import CardStatus from "../../components/card-status";
import { Tabs } from "antd";
import { baseURL } from "../../api/api";
import { useUser } from "../../context/auth";
type Props = {};

const StatusContent = (props: Props) => {
  const [bill, setBill] = useState<any[]>([""]);
  const { userDetail } = useUser();
  const [tabsKey, setTabsKey] = useState<string>(
    userDetail?.Role === "Admin" ? "1" : ""
  );

  useEffect(() => {
    if (userDetail?.Role === "Admin") {
      fetchBill("1");
    } else {
      fetchBill("");
    }
    // eslint-disable-next-line
  }, []);

  const fetchBill = (status?: string) => {
    if (userDetail?.Role === "Admin") {
      baseURL.get(`/api/bill?status=${status}`).then((res) => {
        setBill(res.data);
      });
    } else {
      baseURL
        .get(`/api/bill?userid=${userDetail?.id}&status=${status}`)
        .then((res) => {
          setBill(res.data);
        });
    }
  };

  if (!bill) {
    return <div>Loading...</div>;
  }

  const onChangeTabs = (key: any) => {
    setTabsKey(key);
    if (userDetail?.Role === "Admin") {
      fetchBill(key);
    } else {
      fetchBill(key);
    }
  };

  return (
    <React.Fragment>
      {/* <div className="text-xl bg-white rounded-md p-5">
        <div>คำสั่งซื้อ</div>
        
        <div className=" border-b-2 mt-2"></div>
      </div> */}
      <Tabs
        onChange={onChangeTabs}
        // defaultActiveKey={userDetail?.Role === "Admin" ? "1" : ""}
        activeKey={tabsKey}
        type="card"
        items={[
          { label: "ทั้งหมด", key: "" },
          { label: "สั่งสินค้า", key: "1" },
          { label: "รับคำสั่งซื้อ", key: "2" },
          { label: "กำลังส่ง", key: "3" },
          { label: "สำเร็จ", key: "4" },
        ]}
      />

      <Row gutter={[24, 24]}>
        {bill.map((item: any, index: any) => (
          <Col key={index} span={8}>
            <CardStatus {...item} onChangeTabs={onChangeTabs} key={tabsKey} />
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default StatusContent;
