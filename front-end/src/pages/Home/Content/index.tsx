import React from "react";
import { Route, Routes } from "react-router-dom";
import { useUser } from "../../../context/auth";
import AdminProductContent from "../../Admin/Products";
import AdminReport from "../../Admin/Report";
import StatusContent from "../../Bill-Status";
import ManagementContent from "../../Management";
import ProductsContent from "../../Products";
import Contact from "../../Report/Contact";
import ReportProductContent from "../../Report/Report-Product";

type Props = {};

const CContentRoutes = (props: Props) => {
  const { userDetail } = useUser();
  return (
    <React.Fragment>
      <Routes>
        <Route
          index
          element={
            userDetail?.Role === "Admin" ? (
              <AdminProductContent />
            ) : (
              <ProductsContent />
            )
          }
        ></Route>
        <Route
          path="/home/products"
          element={
            userDetail?.Role === "Admin" ? (
              <AdminProductContent />
            ) : (
              <ProductsContent />
            )
          }
        ></Route>
        <Route path="/home/status" element={<StatusContent />}></Route>
        <Route path="/home/management" element={<ManagementContent />}></Route>
        <Route path="home/contact" element={<Contact />}></Route>

        <Route
          path="*"
          element={
            userDetail?.Role === "Admin" ? (
              <AdminProductContent />
            ) : (
              <ProductsContent />
            )
          }
        ></Route>
        <Route
          path="home/report-product"
          element={
            userDetail?.Role === "Admin" ? (
              <AdminReport />
            ) : (
              <ReportProductContent />
            )
          }
        ></Route>
      </Routes>
    </React.Fragment>
  );
};

export default CContentRoutes;
