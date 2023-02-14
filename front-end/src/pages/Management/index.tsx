import React, { useEffect, useState } from "react";
import { Button, Col, Form, Image, Input, Modal, Row } from "antd";
import { useUser } from "../../context/auth";
import { baseURL } from "../../api/api";
import { useNavigate } from "react-router-dom";
type Props = {};

export const refreshPage = () => {
  window.location.reload();
};

const ManagementContent = (props: Props) => {
  const { userDetail, user } = useUser();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  let data = user || "";

  useEffect(() => {
    setValue();
  }, [userDetail]);

  const setValue = () => {
    form.setFieldsValue({
      username: userDetail?.username,
      password: userDetail?.password,
      address: userDetail?.address,
      email: userDetail?.email,
      phone: userDetail?.phone,
    });
  };

  const countDown = () => {
    let secondsToGo = 2;
    const modal = Modal.success({
      title: "แก้ไขข้อมูลเสร็จสิ้น",
      content: `กรุณา Log-in อีกครั้ง`,
    });
    setTimeout(() => {
      modal.destroy();
    }, secondsToGo * 1000);
  };

  const editUser = async (data: any) => {
    await baseURL
      .patch(`/api/users/${userDetail?.id}`, data)
      .then((res) => {
        countDown();
        navigate("/login");
        refreshPage();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <div className="bg-white h-full rounded-md p-5 ">
        <div className="text-xl pb-2 border-b-2">การจัดการผู้ใช้งาน</div>
        {/* <div className="text-center mt-5">
          <Image
            className="rounded-full"
            preview={false}
            width={200}
            // src="https://play-lh.googleusercontent.com/BMryS7Cn454jIAVrchF9as-7WOG07H97Lugr62ISdJSo7wj1cC-0MTUm3SqSZffc7IQ"
          />
          <br></br>
          <Button type="link">แก้ไขรูปภาพ</Button>
        </div> */}
        <Form name="user" form={form} onFinish={editUser}>
          <Row className="mt-7" gutter={24}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="ชื่อผู้ใช้"
                // initialValue={userDetail?.username}
              >
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="รหัสผ่าน"
                // initialValue={userDetail?.password}
              >
                <Input.Password></Input.Password>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                // initialValue={userDetail?.username}
              >
                <Input></Input>
              </Form.Item>
            </Col>{" "}
            <Col span={12}>
              <Form.Item
                name="phone"
                label="เบอร์โทรศัพท์"
                // initialValue={userDetail?.username}
              >
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="address"
                label="ที่อยู่"
                // initialValue={userDetail?.address}
              >
                <Input.TextArea rows={4}></Input.TextArea>
              </Form.Item>
            </Col>
          </Row>
          <div className=" flex justify-end">
            <Form.Item>
              <Button
                type="primary"
                danger
                onClick={() => {
                  setValue();
                }}
              >
                ยกเลิก
              </Button>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                className="bg-green-400 border-none after:bg-green-400 active:bg-green-400 hover:bg-green-400 ml-2"
                htmlType="submit"
              >
                แก้ไขข้อมูล
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default ManagementContent;
