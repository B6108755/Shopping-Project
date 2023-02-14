import { Button, Form, Image, Input, Tabs, Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../api/api";
import { useUser } from "../../context/auth";

type Props = {};

const LoginPage = (props: Props) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState([]);
  const [form] = Form.useForm();
  const [login, setLogin] = useState<string>("Login");
  const { user, findToken } = useUser();

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(username));
  }, [username]);

  const useNavigation = () => {
    navigate("/home/products");
  };

  return (
    <React.Fragment>
      <div className="flex justify-between items-center h-full">
        <Image
          className="!h-[100vh]"
          src="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa5nLjLbSuPmD4wwTS5jAfni2a3CKVjO1RnHIEaDVabur9gFRECJb.jpg"
          preview={false}
        ></Image>
        <div className="block h-full w-[500px] bg-white  rounded-l-lg items-center opacity-90">
          <Tabs
            defaultActiveKey="login"
            className="mx-5"
            onChange={(e) => {
              setLogin(e);
            }}
            items={[
              {
                key: "Login",
                label: "Login",
              },
              {
                key: "Register",
                label: "Register",
              },
            ]}
          />
          {getForm(login, useNavigation, setUsername, user, findToken, form)}
        </div>
      </div>
    </React.Fragment>
  );
};

export default LoginPage;

const getForm = (
  type: string,
  navigate: () => void,
  setUsername: any,
  user: any,
  findToken: any,
  form: any
) => {

  type Tmodal = "success" | "fail" | "successRegister" | "failRegister";
  const countDown = (type: Tmodal, res: any) => {
    if (type === "success") {
      let secondsToGo = 1;
      const modal = Modal.success({
        title: "เข้าสู่ระบบเสร็จสิ้น",
        content: `ไปยังหน้าหลัก`,
      });
      setTimeout(() => {
        modal.destroy();
      }, secondsToGo * 1000);

      navigate();
    } else if (type === "successRegister") {
      let secondsToGo = 1;
      const modal = Modal.success({
        title: "สมัครสมาชิกเสร็จสิ้น",
        content: `สามารถเข้าสู่ระบบได้`,
      });
      setTimeout(() => {
        modal.destroy();
      }, secondsToGo * 1000);
    } else if (type === "failRegister") {
      let secondsToGo = 1;
      const modal = Modal.error({
        title: "ไม่สามารถสมัครสมาชิกได้",
        content: `${res}`,
      });
      setTimeout(() => {
        modal.destroy();
      }, secondsToGo * 2000);
    } else {
      let secondsToGo = 2;
      const modal = Modal.error({
        title: "username หรือ password ไม่ถูกต้อง",
        content: `${res.message}`,
      });
      setTimeout(() => {
        modal.destroy();
      }, secondsToGo * 2000);
    }
  };

  const onFinishLogin = (data: any) => {
    baseURL
      .post(`/api/auth/login`, data)
      .then(function (response) {
        countDown("success", response);
        setUsername(response.data.access_token);
        findToken(response.data.access_token);
      })
      .catch(function (error) {
        console.log(error);
        countDown("fail", error);
      });
  };

  const onFinishRegister = (data: any) => {
    data = { Role: "User", ...data };
    if (data.password === data.repassword) {
      delete data.repassword;
      baseURL.post(`/api/users`, data).then((res) => {
        if (res.data?.status === "404") {
          countDown("failRegister", "username นี้ถูกใช้ไปแล้ว");
        } else {
          countDown("successRegister", res);
          form.resetFields();
          console.log(res);
        }
      });
    } else {
      countDown("failRegister", "กรุณาตรวจสอบ password ไม่ตรงกับ re-password");
    }
  };

  if (type === "Login") {
    return (
      <Form
        name="Login"
        className="px-5 pt-2"
        onFinish={onFinishLogin}
        form={form}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item className="text-end ">
          <Button
            className="bg-[#80fc8d] hover:text-black hover:bg-[#c1efce] border-none rounded-sm"
            htmlType="submit"
            type="default"
            // onClick={navigate}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  } else {
    return (
      <Form
        name="Register"
        className="px-5 pt-2"
        onFinish={onFinishRegister}
        form={form}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "กรุณากรอก username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "กรุณากรอก password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="RePassword"
          name="repassword"
          rules={[{ required: true, message: "กรุณากรอก password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true , type: "email", message: "กรุณากรอก email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            { required: true, message: "กรุณากรอก phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item className="text-end ">
          <Button
            className="bg-[#80fc8d] hover:text-black hover:bg-[#c1efce] border-none rounded-sm"
            htmlType="submit"
            type="default"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
};
