import {
  Button,
  Col,
  Drawer,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  notification,
  Row,
} from "antd";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../api/api";
import Upload, { RcFile } from "antd/es/upload";
import {
  CheckOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Axios from "axios";
type Props = {};

const DrawerEditProduct = ({ open, trigger, fetchData, data }: any) => {
  const { img, name, price, quantity, note, startDate, endDate, id } = data;
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [ImageURL, setImageURL] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({
      img: img,
      name: name,
      price: price,
      quantity: quantity,
      note: note,
    });
    setImageURL(img);
  }, [data]);

  const openNotification = () => {
    api.open({
      message: "แก้ไขสินค้าสำเร็จ",
      icon: <CheckOutlined style={{ color: "#0df505" }} />,
      duration: 3,
    });
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    return isJpgOrPng;
  };

  const uploadFiles = async (files: any) => {
    let formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "fjbyulqh");
    setLoading(true);
    await Axios.post(
      `https://api.cloudinary.com/v1_1/dnvyxfzxt/image/upload`,
      formData
    ).then((res) => {
      setImageURL(res.data["secure_url"]);
      setLoading(false);
    });
  };

  const onFinishProduct = (data: any) => {
    data.img = ImageURL;
    baseURL
      .patch(`/api/product/${id}`, data)
      .then((res) => {
        openNotification();
        fetchData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <React.Fragment>
      <Drawer
        closable={false}
        title={
          <div className=" font-semibold">
            <div>แก้ไขสินค้า</div>
          </div>
        }
        placement="right"
        onClose={trigger}
        open={open}
      >
        <Form name="AddProduct" form={form} onFinish={onFinishProduct}>
          <div className="text-center p-2">
            <Upload
              name="img"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={beforeUpload}
              customRequest={(e) => {
                console.log(e.file);
                uploadFiles(e.file);
              }}
              // onChange={handleChange}
              accept="image/png, image/jpeg"
            >
              {ImageURL ? (
                loading ? (
                  <LoadingOutlined />
                ) : (
                  <img src={ImageURL} alt="img" style={{ width: "100%" }} />
                )
              ) : (
                // <img src={ImageURL} alt="img" style={{ width: "100%" }} />
                uploadButton
              )}
            </Upload>
          </div>
          <Form.Item name="name" label="ชื่อสินค้า" className="mt-5">
            <Input></Input>
          </Form.Item>
          <Form.Item name="price" label="ราคา">
            <InputNumber prefix={"฿"} className="w-full"></InputNumber>
          </Form.Item>
          <Form.Item name="quantity" label="จำนวนสินค้า">
            <InputNumber className="w-full"></InputNumber>
          </Form.Item>
          <Form.Item name="note" label="โน็ต">
            <Input></Input>
          </Form.Item>
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
                htmlType="submit"
                className="bg-green-400 border-none after:bg-green-400 active:bg-green-400 hover:bg-green-400 w-[80%]"
                onClick={() => {
                  trigger();
                }}
              >
                ตกลง
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
      {contextHolder}
    </React.Fragment>
  );
};

export default DrawerEditProduct;
