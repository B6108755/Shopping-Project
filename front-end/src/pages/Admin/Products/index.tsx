import { Button, Image, Input, message, Modal, Table } from "antd";
import React, { useEffect, useState } from "react";
import product from "../../../mock/product.json";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import DrawerProduct from "../../../components/drawerProduct";
import { baseURL } from "../../../api/api";
import DrawerEditProduct from "../../../components/drawerEditProduct";
import moment from "moment";

type Props = {};

const AdminProductContent = (props: Props) => {
  const [pro, setPro] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState<any>([]);
  const [recordModal, setRecordModal] = useState<any>(product[0]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [pro]);

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

  const onSearchProduct = (data: any) => {
    fetchData(data.target.value);
  };

  const trigger = () => {
    setOpen(!open);
  };

  const triggerEdit = () => {
    setOpenEdit(!openEdit);
  };

  const Mtrigger = () => {
    setOpenModal(!openModal);
  };

  const handleOk = (id: any) => {
    baseURL.delete(`api/product/${recordModal.id}`).then((res) => {
      fetchData();
    });
    Mtrigger();
  };

  const handleCancel = () => {
    Mtrigger();
  };

  const columns = [
    {
      title: "รูปภาพ",
      key: "imgUrl",
      render: (_: any, { img }: any) => (
        <Image preview={false} src={img} className=" !h-20 !w-20"></Image>
      ),
      width: "10%",
    },
    {
      title: "ชื่อสินค้า",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "ราคา",
      key: "price",
      width: "10%",
      render: (id: number, record: any) => <div>฿ {record.price}</div>,
    },
    {
      title: "คลังสินค้า",
      dataIndex: "quantity",
      key: "quantity",
      width: "10%",
    },
    {
      title: "วันที่แก้ไขล่าสุด",
      // dataIndex: "updated_at",
      key: "updated_at",
      width: "10%",
      render: (id: number, record: any) => (
        <>{moment(record?.updated_at).format("HH:mm DD-MM-YYYY")}</>
      ),
    },

    {
      title: "โน็ต",
      dataIndex: "note",
      key: "note",
      width: "10%",
    },
    {
      title: "จัดการ",
      key: "detail",
      width: "10%",
      render: (id: number, record: any) => (
        <div className="flex gap-5 text-base">
          <EditOutlined
            className="w-5 h-5 "
            onClick={() => {
              setData(record);
              setOpenEdit(true);
            }}
          />

          <DeleteOutlined
            className="w-5 h-5 "
            onClick={() => {
              setRecordModal(record);
              Mtrigger();
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <React.Fragment>
      <div className=" bg-white rounded-md p-5">
        <div className="text-xl pb-2 border-b-2">สินค้า</div>
        <div className="flex justify-between my-5">
          <Input
            placeholder="ชื่อสินค้า"
            onChange={onSearchProduct}
            suffix={<SearchOutlined className="h-4 w-4" />}
            className=" w-[25%] "
          />
          <Button
            onClick={trigger}
            type="primary"
            className="bg-green-400 border-none after:bg-green-400 active:bg-green-400 hover:bg-green-400"
          >
            + เพิ่มสินค้า
          </Button>
        </div>
        <Table dataSource={pro} columns={columns} rowKey={"id"} />
      </div>
      <DrawerProduct open={open} trigger={trigger} fetchData={fetchData} />
      <DrawerEditProduct
        open={openEdit}
        trigger={triggerEdit}
        data={data}
        fetchData={fetchData}
      />
      <Modal
        title="ต้องการลบ?"
        open={openModal}
        onOk={handleOk}
        okType="default"
        okText="ตกลง"
        cancelText="ยกเลิก"
        onCancel={handleCancel}
      >
        สินค้า ID : {recordModal.id}
        <br></br>
        ชื่อสินค้า : {recordModal.name}
      </Modal>
    </React.Fragment>
  );
};

export default AdminProductContent;
