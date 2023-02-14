import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../../api/api";
import { useUser } from "../../../context/auth";

type Props = {};

const Contact = (props: Props) => {
  const { userDetail } = useUser();
  const [isEdit, setIsEdit] = useState<boolean>(true);
  const [contact, setContact] = useState<any>();
  const [form] = Form.useForm();

  useEffect(() => {
    fetchContact();
    //
  }, []);

  const fetchContact = async () => {
    await baseURL.get(`/api/contact/1`).then((res) => {
      setContact(res.data);
    });
  };

  const editButton = () => {
    if (isEdit) {
      return (
        <div>
          {/* <Button type="link">แก้ไข</Button> */}
          <a
            onClick={() => {
              setIsEdit(false);
            }}
            className=" text-base underline text-blue-400 px-2"
          >
            Edit
          </a>
        </div>
      );
    } else {
      return (
        <div className="flex">
          <Form.Item>
            <Button
              type="primary"
              danger
              onClick={() => {
                setIsEdit(true);
                form.resetFields();
              }}
            >
              ยกเลิก
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="default" className="ml-2" htmlType="submit">
              ยืนยัน
            </Button>
          </Form.Item>
        </div>
      );
    }
  };

  const contacts = (key: string, words: string) => {
    if (!isEdit) {
      return (
        <Form.Item name={key} initialValue={words} label={key}>
          <Input></Input>
        </Form.Item>
      );
    }

    return (
      <div className=" flex justify-center text-center mb-3">
        <div className="font-bold">{key}</div>
        <div className="ml-2">{` : ${words}`}</div>
      </div>
    );
  };

  const onFinishContact = async (value: any) => {
    console.log(value);
    await baseURL.patch(`/api/contact/1`, value).then((res) => {
      console.log(res);
      setIsEdit(true);
      fetchContact();
      // form.resetFields();
    });
  };

  return (
    <React.Fragment>
      <div className="h-full bg-white rounded-md p-5">
        <Form name="contact" form={form} onFinish={onFinishContact}>
          <div className="text-xl pb-2 border-b-2 flex justify-between">
            <div>ติดต่อเรา</div>
            {userDetail?.Role === "Admin" ? editButton() : <></>}
          </div>
          <div className=" justify-center text-center py-10 ">
            <div className="text-[#123265] font-bold xl:text-lg   md:text-base">
              EVERYDAY fresh fruits
            </div>

            <div className="mt-5 mb-20">
              วัตถุดิบสดใหม่ ทุกวันจากฟาร์มออร์แกนิค
            </div>
            {contacts("Facebook", contact?.Facebook)}
            {contacts("Instagram", contact?.Instagram)}
            {contacts("Email", contact?.Email)}
            {contacts("Phone", contact?.Phone)}
          </div>
        </Form>
      </div>
    </React.Fragment>
  );
};

export default Contact;
