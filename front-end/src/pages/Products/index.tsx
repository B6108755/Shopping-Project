import { Carousel, Col, Image, Row } from "antd";
import React, { useEffect, useState } from "react";
import CardProduct from "../../components/product";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { baseURL } from "../../api/api";
import { useUser } from "../../context/auth";
import { useProduct } from "../../context/product";

type Props = {};

const ProductsContent = (props: Props) => {
  const { pro, setPro } = useProduct();
  const { user, setUserDatail } = useUser();
  let data = user || "";

  useEffect(() => {
    fetchData();
  }, [pro]);

  useEffect(() => {
    if (data.username) {
      fetchDataUser();
    }
  }, [data]);

  const fetchData = (name?: string) => {
    if (name) {
      baseURL.get(`/api/product?name=${name}`).then((res) => {
        setPro(res.data);
      });
    } else {
      baseURL.get(`/api/product`).then((res) => {
        setPro(res.data);
      });
    }
  };

  const fetchDataUser = () => {
    baseURL.get(`/api/users/${data.username}`).then((res) => {
      setUserDatail(res.data);
    });
  };

  if (!pro) {
    return <div>Loading...</div>;
  }

  const onSearchProduct = (data: any) => {
    fetchData(data.target.value);
  };

  return (
    <React.Fragment>
      <Carousel autoplay effect="fade">
        <Image
          className=" !h-[50vh] !w-[200vh]"
          preview={false}
          src="https://thumbs.dreamstime.com/z/top-view-fresh-fruit-ready-banner-poster-leaflet-printable-advertisement-everyday-fresh-fruits-inscription-graphics-154425454.jpg"
        ></Image>
        <Image
          className=" !h-[50vh] !w-[200vh]"
          preview={false}
          src="https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg"
        ></Image>
        <Image
          className=" !h-[50vh] !w-[200vh]"
          preview={false}
          src="https://www.healthyeating.org/images/default-source/home-0.0/nutrition-topics-2.0/general-nutrition-wellness/2-2-2-3foodgroups_fruits_detailfeature.jpg?sfvrsn=64942d53_4"
        ></Image>
      </Carousel>

      <div className="justify-end text-end mt-5">
        <Input
          onChange={onSearchProduct}
          placeholder="ชื่อสินค้า"
          suffix={<SearchOutlined className="h-4 w-4" />}
          className=" !border-none mb-5 w-[25%] "
        />
      </div>
      <Row gutter={[12, 12]}>
        {pro.map((item: any, index: any) => (
          <Col key={index} span={4}>
            <CardProduct props={item} fetchProduct={fetchData} />
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default ProductsContent;

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};
