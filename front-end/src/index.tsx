import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import "antd/dist/antd.css";
import "./index.css";
import UserProvider from "./context/auth";
import CartProvider from "./context/cart";
import ProductProvider from "./context/product";
import ReportProvider from "./context/report";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ProductProvider>
          <ReportProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ReportProvider>
        </ProductProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
