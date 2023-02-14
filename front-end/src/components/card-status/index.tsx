import React, { useState } from "react";
import {
  CarOutlined,
  SolutionOutlined,
  UserOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Input,
  Modal,
  notification,
  Row,
  Steps,
} from "antd";
import { useUser } from "../../context/auth";
import { baseURL } from "../../api/api";

const CardStatus = (props: any | []) => {
  const { userDetail } = useUser();
  let product: any = [];
  product = props?.product?.split(" ");
  let billProduct: any[] = [];

  product?.map((item: any, index: any) => {
    if (index !== 0) {
      billProduct[index - 1] = {
        name: item?.split("/")[0],
        quantity: item?.split("/")[1],
        price: item?.split("/")[2],
        id: item?.split("/")[3],
      };
    }
  });

  if (props === undefined) {
    return <>loading...</>;
  }

  const statusChack = (status: any) => {
    if (status === "1") {
      return "สั่งสินค้า";
    } else if (status === "2") {
      return "รับคำสั่งซื้อ";
    } else if (status === "3") {
      return "กำลังส่ง";
    }
    return "สำเร็จ";
  };

  return (
    <React.Fragment>
      <Card bordered={false} className="rounded-md pt-3 px-3 w-full">
        <div className="border-b-2 pb-3 ">
          <div className="flex justify-between">
            <div className="font-bold ">{`Order No. ${props?.id}`}</div>
            <div>{`สถานะ : ${statusChack(props.status)}`}</div>
          </div>
          {props?.tracking !== null ? (
            <div className=" opacity-90 flex justify-between items-center">
              <div>หมายเลขพัสดุ : {`${props?.tracking}`}</div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <StepStatus status={props?.status} />
        <Row gutter={12} className="mb-2">
          <Col span={5}>ชื่อผู้รับ</Col>
          <Col span={19}>{`: ${props?.username}`}</Col>
          <Col span={5}>เบอร์โทร</Col>
          <Col span={19}>{`: ${props?.phone}`}</Col>

          <Col span={5}>ที่อยู่</Col>
          <Col span={19}>{`:  ${props?.address}`}</Col>
        </Row>
        <div className="border-y-2 py-2 flex justify-between font-semibold">
          <div>รายการ</div>
          <div>ราคา</div>
        </div>
        {billProduct.map((item: any) => (
          <Row className="mt-2" key={item?.name}>
            <Col span={18}>{`${item?.name} x ${item?.quantity}`}</Col>
            <Col span={6} className="text-end">{`฿ ${
              item?.price * item?.quantity
            }`}</Col>
          </Row>
        ))}
        <Row className="mt-2" key="shipping">
          <Col span={18}>{`ค่าส่ง`}</Col>
          <Col span={6} className="text-end">{`฿ 45`}</Col>
        </Row>
        <div className="mt-3 flex justify-between border-t-2 py-2">
          <div className="font-semibold">รวม</div>
          <div>{`฿ ${props?.priceSum}`}</div>
        </div>
        {userDetail?.Role === "Admin" ? (
          <div className="text-center mt-2 border-t-2 pt-2">
            {CButtonType(props?.status, props?.id, props?.onChangeTabs)}
          </div>
        ) : (
          <React.Fragment>
            {props?.status === "3" ? (
              <div className="text-center mt-2 border-t-2 pt-2">
                {CButtonType(props?.status, props?.id, props?.onChangeTabs)}
              </div>
            ) : null}
          </React.Fragment>
        )}
      </Card>
    </React.Fragment>
  );
};

export default CardStatus;

type TButton = "1" | "2" | "3" | "4";

const CButtonType = (type: TButton, id: string, fetchBill?: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tracking, setTracking] = useState<string>("");
  const [api, contextHolder] = notification.useNotification();

  const trigger = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    await baseURL
      .patch(`/api/bill/${id}`, { tracking: tracking, status: "3" })
      .then((res) => {
        fetchBill("3");
      });
  };

  const ChangeStatus = async (value: any) => {
    await baseURL.patch(`/api/bill/${id}`, { status: value }).then((res) => {
      fetchBill(value);
    });
  };

  const InputTracking = async (value: any) => {
    setTracking(value.target.value);
  };

  const onDelectBill = async () => {
    await baseURL.delete(`/api/bill/${id}`).then((res) => {
      fetchBill("4");
    });
  };

  const openNotification = () => {
    api.open({
      message: "ลบบิลสำเร็จ",
      description: `Order No.${id} ถูกลบแล้ว`,
      icon: <CheckOutlined style={{ color: "#0df505" }} />,
      duration: 3,
    });
    onDelectBill();
  };

  if (type === "1") {
    return (
      <Button
        type="default"
        className=" w-full"
        onClick={() => {
          ChangeStatus("2");
        }}
      >
        รับคำสั่งซื้อ
      </Button>
    );
  } else if (type === "2") {
    return (
      <>
        <Button type="default" className=" w-full" onClick={trigger}>
          ส่งสินค้าแล้ว
        </Button>
        <Modal
          title="หมายเลขพัสดุ"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={trigger}
          okType="default"
          cancelText={"ยกเลิก"}
          okText={"ยืนยัน"}
        >
          <div className="border-t-2 pt-3">
            <Input onChange={InputTracking}></Input>
          </div>
        </Modal>
      </>
    );
  } else if (type === "3") {
    return (
      <Button
        type="default"
        className=" w-full"
        onClick={() => {
          ChangeStatus("4");
        }}
      >
        ยืนยันการรับสินค้า
      </Button>
    );
  } else {
    return (
      <>
        <Button
          type="default"
          className=" w-full"
          onClick={() => {
            openNotification();
            // onDelectBill();
          }}
        >
          ลบบิล
        </Button>
        {contextHolder}
      </>
    );
  }
};

const StepStatus = ({ status }: any) => {
  let statusAll: any = [`wait`, `wait`, `wait`, `wait`];
  if (status === "1") {
    statusAll[0] = "process";
  } else if (status === "2") {
    statusAll[0] = "finish";
    statusAll[1] = "process";
  } else if (status === "3") {
    statusAll[0] = "finish";
    statusAll[1] = "finish";
    statusAll[2] = "process";
  } else if (status === "4") {
    statusAll[0] = "finish";
    statusAll[1] = "finish";
    statusAll[2] = "finish";
    statusAll[3] = "process";
  }

  return (
    <Steps
      size="small"
      className="my-5"
      items={[
        {
          status: statusAll[0],
          icon: <UserOutlined />,
        },
        {
          status: statusAll[1],
          icon: <SolutionOutlined />,
        },
        {
          status: statusAll[2],
          icon: <CarOutlined />,
        },
        {
          status: statusAll[3],
          icon: <CheckOutlined />,
        },
      ]}
    />
  );
};
