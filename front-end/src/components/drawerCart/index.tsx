import { Button, Col, Drawer, notification, Row } from "antd";
import React, { useState } from "react";
import { useCart } from "../../context/cart";
import ConfirmModal from "../confirmModal/confirmModal";
type Props = {};

const DrawerCart = ({ open, trigger }: any) => {
  const { productProvider } = useCart();
  const [openModal, setOpenModal] = useState<boolean>(false);

  let cartC = productProvider;
  let sumPrice = 0;
  let sumpro: any = [];
  let j = 1;
  for (let i = 0; i <= cartC.length; i++) {
    if (!cartC[i]) {
    } else {
      if (cartC[i].quantilyCart === 0) {
      } else {
        sumpro.push(cartC[i]);
        sumPrice = sumPrice + cartC[i].price * cartC[i].quantilyCart;
      }
    }
  }

  return (
    <React.Fragment>
      <Drawer
        closable={false}
        title={
          <div className="flex justify-between font-semibold">
            <div>รายการ</div>
            <div>ราคา</div>
          </div>
        }
        placement="right"
        onClose={trigger}
        open={open}
      >
        {sumpro.length === 0 ? (
          <>ไม่มีสินค้าในตระกร้า</>
        ) : (
          <>
            {sumpro.map((item: any, index: any) => (
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
            <Row gutter={0} className="mt-1 pt-5 border-t-2 text-center">
              <Col span={12}>
                <Button
                  type="primary"
                  danger
                  className="w-[80%]"
                  onClick={trigger}
                >
                  ยกเลิก
                </Button>
              </Col>
              <Col span={12}>
                <Button
                  type="primary"
                  className="bg-green-400 border-none after:bg-green-400 active:bg-green-400 hover:bg-green-400 w-[80%]"
                  onClick={() => {
                    trigger();
                    setOpenModal(true);
                  }}
                >
                  สั่งสินค้า
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Drawer>
      <ConfirmModal
        open={openModal}
        setOpen={setOpenModal}
        data={sumpro}
        sumPrice={sumPrice}
      ></ConfirmModal>
    </React.Fragment>
  );
};

export default DrawerCart;
