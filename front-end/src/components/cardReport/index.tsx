import { Button, Card, Checkbox, Col, Row } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../api/api";
import { useReport } from "../../context/report";
import { DeleteOutlined } from "@ant-design/icons";
type Props = {
  props: any;
  color: "white" | "gray";
};

function CardReport({ props, color }: Props) {
  const { setReport } = useReport();

  const fetchReport = async () => {
    await baseURL.get(`/api/report`).then((res) => {
      setReport(res.data);
    });
  };

  const onChange = async (e: CheckboxChangeEvent) => {
    await baseURL
      .patch(`/api/report/${props?.id}`, { status: e.target.checked })
      .then((res) => {
        // fetchReport();
      });
  };

  const cheackBackground = (type: string) => {
    if (type === "white") {
      return "bg-white";
    } else {
      return "bg-slate-100";
    }
  };

  const statusChack = (isCheack: boolean) => {
    if (isCheack) {
      return (
        <div className="bg-green-400 p-1 rounded-md ">
          สถานะ : ดำเนินการแล้ว
        </div>
      );
    } else {
      return (
        <div className="bg-red-400 p-1 rounded-md ">สถานะ : กำลังดำเนินการ</div>
      );
    }
  };

  const onCancelReport = async () => {
    baseURL.delete(`/api/report/${props?.id}`).then((res) => {
      fetchReport();
    });
  };

  return (
    <React.Fragment>
      <Card
        bordered={false}
        className={clsx(
          "rounded-md pt-3 px-3 w-full ",
          cheackBackground(color)
        )}
      >
        <div className="border-b-2 pb-3 ">
          <div className="flex justify-between">
            <div className="font-bold ">{`Report No. ${props?.id}`}</div>
            {color === "white" ? (
              <Checkbox onChange={onChange} defaultChecked={props?.status}>
                ดำเนินการแล้ว
              </Checkbox>
            ) : (
              statusChack(props.status)
            )}
          </div>
        </div>
        <Row gutter={12} className="m-3 ">
          <Col span={6}>ผู้แจ้ง</Col>
          <Col span={18}>{`: ${props?.username}`}</Col>
          <Col span={6}>เบอร์ติดต่อ</Col>
          <Col span={18}>{`: ${props?.phone}`}</Col>
        </Row>
        <div className="my-3 border-b-2"></div>
        <div className="font-bold">{props?.topic}</div>
        <div className="mt-2">{props?.detail}</div>
        <div className=" text-right">
          {color === "gray" ? (
            <a className=" underline text-blue-400" onClick={onCancelReport}>
              ยกเลิกคำร้อง
            </a>
          ) : null}
        </div>
      </Card>
    </React.Fragment>
  );
}

export default CardReport;
