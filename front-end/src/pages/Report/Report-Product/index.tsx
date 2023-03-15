import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Select,
} from "antd";
import React, { useEffect } from "react";
import { CheckOutlined } from "@ant-design/icons";
import { baseURL } from "../../../api/api";
import { useUser } from "../../../context/auth";
import { useReport } from "../../../context/report";
import CardReport from "../../../components/cardReport";
type Props = {};

let topics: any = [
  { value: "สินค้าชำรุด", label: "สินค้าชำรุด" },
  { value: "ยังไม่ได้รับสินค้า", label: "ยังไม่ได้รับสินค้า" },
  { value: "อื่น ๆ", label: "อื่น ๆ" },
];

const ReportProductContent = (props: Props) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const { userDetail } = useUser();
  const { report, setReport } = useReport();

  useEffect(() => {
    fetchReport();
    form.setFieldsValue({
      phone: userDetail?.phone,
    });
        // eslint-disable-next-line
  }, [report]);

  const fetchReport = async () => {
    await baseURL.get(`/api/report?userid=${userDetail?.id}`).then((res) => {
      console.log(res.data);
      setReport(res.data);
    });
  };

  const onFinishReport = async (value: any) => {
    if (!value.topic) {
      value.topic = "สินค้าชำรุด";
    }
    value.username = userDetail?.username;
    value.userid = userDetail?.id;
    value.status = "0";
    console.log(value);
    await baseURL.post(`/api/report`, value).then((res) => {
      form.resetFields();
      form.setFieldsValue({ phone: userDetail?.phone });
      openNotification();
      fetchReport();
    });
  };

  const openNotification = () => {
    api.open({
      message: "แจ้งปัญหาเสร็จสิ้น",
      description: "เราได้บันทึกการแจ้งปัญหาแล้ว กรุณารอ Admin",
      icon: <CheckOutlined style={{ color: "#0df505" }} />,
      duration: 3,
    });
  };

  return (
    <React.Fragment>
      <div className="text-xl bg-white rounded-md p-5 h-full">
        <div>การแจ้งปัญหา</div>
        <div className=" border-b-2 mt-2"></div>
        <Row gutter={12} className="mt-5">
        <Col span={12}>
          <Form
            form={form}
            name="report"

            onFinish={onFinishReport}
            // validateMessages={{ required: "กรุณากรอก` ${label}`" }}
          >
            <div className="px-10 bg-white h-[72vh] border-r-2">
              <div className=" text-lg">รายงานปัญหา</div>
              <div className=" border-b-2 mt-2 mb-5"></div>
              <Form.Item name="topic" label="หัวข้อปัญหา">
                <Select
                  defaultValue={"สินค้าชำรุด"}
                  placeholder="ปัญหา"
                  options={topics}
                />
              </Form.Item>
              <Form.Item
                name="detail"
                label="รายละเอียด"
                rules={[{ required: true, message: "กรุณาระบุรายละเอียด" }]}
              >
                <Input.TextArea
                  rows={4}
                  placeholder="รายละเอียด"
                ></Input.TextArea>
              </Form.Item>
              <Form.Item
                name="phone"
                label="เบอร์ติดต่อ"
                rules={[{ required: true, message: "กรุณากรอกเบอร์ติดต่อ" }]}
              >
                <Input
                  placeholder="เบอร์ติดต่อ"
                  defaultValue={userDetail?.phone}
                ></Input>
              </Form.Item>
              <div className=" flex justify-end">
                <Form.Item>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      form.resetFields();
                      fetchReport();
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
                    ตกลง
                  </Button>
                </Form.Item>
              </div>
            </div>
          </Form>
        </Col>
        <Col span={12} >
          <div className=" bg-white h-[72vh] border-l-2">
            <div className=" text-lg px-10">ติดตามการรายงาน</div>
            <div className=" border-b-2 mt-2 mb-5 mx-10"></div>
            <div className="h-[60vh] overflow-auto overscroll-y-auto mr-5">
              {report
                ?.filter((e: any) => e.userid === userDetail?.id)
                .map((item: any, index: any) => (
                  <div key={index} className=" mb-3 pl-10 pr-5">
                    <CardReport props={item} color="gray" />
                  </div>
                ))}
            </div>
          </div>
        </Col>
      </Row>
      </div>
     
      {contextHolder}
    </React.Fragment>
  );
};

export default ReportProductContent;
