import { Button, Card, Col, Image, Row, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useCart } from "../../context/cart";
import ButtonAdd from "../buttonAdd";

type StoreItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  quantity: number;
};

type Props = {
  props: any;
  fetchProduct: () => void;
};

function CardProduct({ props, fetchProduct }: Props) {
  const [quantilyCart, setQuantityCart] = useState<any>(0);
  const { productProvider, zero } = useCart();
  const { id, name, price, quantity, img } = props;

  useEffect(() => {
    setQuantityCart(0);
  }, [zero]);

  useEffect(() => {
    Cartset();
  }, [quantilyCart]);

  const Cartset = () => {
    productProvider[id] = { id, name, price, quantity, quantilyCart };
  };

  return (
    <React.Fragment>
      <div className="">
        <Card bordered={false} className="w-full rounded-md bg-">
          <Row className="text-base font-medium flex justify-between">
            <Col span={14}>
              <Typography.Text ellipsis={{ tooltip: name }}>
                {name}
              </Typography.Text>
            </Col>
            <Col span={10} className="text-end">
              <Typography.Text ellipsis={{ tooltip: `$ ${price}` }}>
                {`฿ ${price}`}
              </Typography.Text>
            </Col>
          </Row>
          <div className=" border-2 text-center h-36 overflow-hidden my-auto">
            <Image
              src={img}
              className="h-full hover:h-36 flex"
              preview={false}
            ></Image>
          </div>
          <div className="flex justify-between mt-2 border-b-2 pb-2 opacity-70 text-sm">
            <div>Stock</div>
            <div>{quantity}</div>
          </div>

          <Row gutter={12} className="flex text-center mt-5">
            <ButtonAdd
              quantity={quantity}
              quantilyCart={quantilyCart}
              setQuantity={setQuantityCart}
            ></ButtonAdd>
          </Row>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default CardProduct;
