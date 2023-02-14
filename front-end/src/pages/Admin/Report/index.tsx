import { Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { baseURL } from "../../../api/api";
import CardReport from "../../../components/cardReport";
import { useReport } from "../../../context/report";

type Props = {};

const AdminReport = (props: Props) => {
  const { report, setReport } = useReport();

  useEffect(() => {
    fetchReport();
    // eslint-disable-next-line
  }, []);

  const fetchReport = async () => {
    await baseURL.get(`/api/report`).then((res) => {
      setReport(res.data);
    });
  };

  return (
    <React.Fragment>
      <div className="text-xl bg-white rounded-md p-5">
        <div>การแจ้งปัญหา</div>
        <div className=" border-b-2 mt-2"></div>
      </div>
      <Row gutter={[12, 12]} className="m-5">
        {report?.map((item: any, index: any) => (
          <Col key={index} span={8}>
            <CardReport props={item} color="white"></CardReport>
          </Col>
        ))}
      </Row>
    </React.Fragment>
  );
};

export default AdminReport;
