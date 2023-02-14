import { Col, Input, Modal, notification, Row } from "antd";
import React from "react";
import { useUser } from "../../context/auth";
import { CheckOutlined } from "@ant-design/icons";
import { baseURL } from "../../api/api";
import { useCart } from "../../context/cart";
import { useProduct } from "../../context/product";

const ConfirmModal = ({ open, setOpen, data, sumPrice }: any) => {
  const [api, contextHolder] = notification.useNotification();
  const { userDetail } = useUser();
  const { clear, productProvider } = useCart();
  const { setPro } = useProduct();
  let creactBillData;

  const openNotification = (type: "add" | "edit") => {
    let title = type === "add" ? "สั่งสินค้าเสร็จสิ้น" : "ผิดพลาด";
    api.open({
      message: title,
      description: "สั่งสินค้าแล้ว กรุณารอ Admin รับคำสั่งซื้อ",
      icon: <CheckOutlined style={{ color: "#0df505" }} />,
      duration: 3,
    });
  };

  let username = userDetail?.username || "";
  let address = userDetail?.address || "";
  let phone = userDetail?.phone || "";
  let id = userDetail?.id || "";
  let product = data || "";
  let allProducts = "";

  product.map((item: any, index: any) => {
    allProducts = `${allProducts} ${item?.name}/${item?.quantilyCart}/${item?.price}/${item?.id}`;
  });

  const onChangeUsrname = (value: any) => {
    username = value.target.value;
  };

  const onChangeAddress = (value: any) => {
    address = value.target.value;
  };

  const onChangePhone = (value: any) => {
    phone = value.target.value;
  };

  const fetchData = () => {
    baseURL.get(`/api/product`).then((res) => {
      setPro(res.data);
    });
  };

  const handleOk = async () => {
    setOpen(false);
    creactBillData = {
      username: username,
      userid: id,
      phone: phone,
      address: address,
      product: allProducts,
      status: "1",
      priceSum: sumPrice + 45,
    };

    let cartC = productProvider;
    for (let i = 0; i <= cartC.length; i++) {
      if (!cartC[i]) {
      } else {
        if (cartC[i].quantilyCart === 0) {
        } else {
          await baseURL.patch(`/api/product/${cartC[i]?.id}`, {
            quantity: cartC[i]?.quantity - cartC[i]?.quantilyCart,
          });
        }
      }
    }

    await baseURL.post(`/api/bill`, creactBillData).then((res) => {
      openNotification("add");
      fetchData();
      clear();
    });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Modal
        title="ตรวจสอบรายการสั่งชื่อ"
        open={open}
        onOk={handleOk}
        okText={"สั่งสินค้า"}
        okType="default"
        onCancel={handleCancel}
        cancelText={"ยกเลิก"}
      >
        <div className="border-t-2">
          <div className=" pt-3">
            <div>
              <Row gutter={16}>
                <Col span={12}>
                  <div className="pb-2 font-semibold">ผู้รับ</div>
                  <Input
                    defaultValue={username}
                    onChange={onChangeUsrname}
                  ></Input>
                </Col>
                <Col span={12}>
                  <div className="pb-2 font-semibold">เบอร์โทรศัพท์</div>
                  <Input defaultValue={phone} onChange={onChangePhone}></Input>
                </Col>
              </Row>
            </div>
            <div>
              <div className="py-2 font-semibold">ที่อยู่</div>
              <Input.TextArea
                defaultValue={address}
                rows={2}
                onChange={onChangeAddress}
              ></Input.TextArea>
            </div>
            <div className="flex justify-between font-semibold mt-3">
              <div>รายการ</div>
              <div>ราคา</div>
            </div>
          </div>
          {data.map((item: any, index: any) => (
            <Row className="mt-2" key={item.name}>
              <Col span={18}>{`${item.name} x ${item.quantilyCart}`}</Col>
              <Col span={6} className="text-end">{`$ ${
                item.price * item.quantilyCart
              }`}</Col>
            </Row>
          ))}
          <Row className="mt-2" key="shipping">
            <Col span={18}>{`ค่าส่ง`}</Col>
            <Col span={6} className="text-end">{`$ 45`}</Col>
          </Row>
          <div className="mt-3 flex justify-between border-t-2 py-2">
            <div className="font-semibold">รวม</div>
            <div>{`$ ${sumPrice + 45}`}</div>
          </div>
        </div>
      </Modal>
      {contextHolder}
    </React.Fragment>
  );
};

export default ConfirmModal;
