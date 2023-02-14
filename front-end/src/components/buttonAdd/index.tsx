import { Button, Col } from "antd";
import React from "react";
import { useCart } from "../../context/cart";

type Props = {
  quantity: any;
  quantilyCart: any;
  setQuantity: (v: any) => void;
};

function ButtonAdd({ quantity, quantilyCart, setQuantity }: Props) {
  if (quantity === 0) {
    return (
      <React.Fragment>
        <Col span={24}>
          <Button
          danger
          type="primary"
            // className="bg-green-400 border-none after:bg-green-400 active:bg-green-400 hover:bg-green-400"
            disabled={true}
          >
            สินค้าหมด
          </Button>
        </Col>
      </React.Fragment>
    );
  } else if (quantilyCart === 0) {
    return (
      <React.Fragment>
        <Col span={24}>
          <Button
            type="primary"
            className="bg-green-400 border-none after:bg-green-400 active:bg-green-400 hover:bg-green-400"
            onClick={() => {
              setQuantity(quantilyCart + 1);
            }}
          >
            + เพิ่มไปยังตะกร้า
          </Button>
        </Col>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Col span={10}>
        <Button
          type="primary"
          danger
          // className="bg-red-400 border-none after:bg-red-400 active:bg-red-400 hover:bg-red-400"
          onClick={() => {
            if (quantilyCart === 0) {
              return;
            }
            setQuantity(quantilyCart - 1);
          }}
        >
          -
        </Button>
      </Col>
      <Col span={4} className="my-auto">
        {quantilyCart}
      </Col>
      <Col span={10}>
        <Button
          type="primary"
          className="bg-green-400 border-none after:bg-green-400 active:bg-green-400 hover:bg-green-400"
          onClick={() => {
            if (quantilyCart < quantity) {
              setQuantity(quantilyCart + 1);
            }
          }}
        >
          +
        </Button>
      </Col>
    </React.Fragment>
  );
}

export default ButtonAdd;
