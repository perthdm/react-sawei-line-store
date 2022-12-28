import React, { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  List,
  Modal,
  Input,
  Radio,
  Space,
  Upload,
} from "antd";
import {
  getImgProfile,
  getName,
  getLineId,
  getSoi,
  getAddress,
  getLineProfile,
} from "../utils/utility";
import {
  DeleteOutlined,
  EditOutlined,
  InboxOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import SaWeiService from "services/SaWeiService";
const { Meta } = Card;

const ModalEditAddress = ({
  isOpen,
  onClose,
  usAddress,
  onChange,
  onSubmit,
}) => {
  return (
    <Modal
      title="แก้ไขที่ขจัดส่ง"
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button
          style={{
            width: "100%",
            backgroundColor: "#83633f",
            color: "white",
            height: "35px",
          }}
          onClick={onSubmit}
        >
          บันทึก
        </Button>,
      ]}
    >
      <Row
        gutter={[16, 8]}
        style={{ marginBottom: "1.25rem", marginTop: "1.25rem" }}
      >
        <Col span={6} style={{ lineHeight: 1.25 }}>
          ซอย :
        </Col>
        <Col span={18}>
          <Input
            placeholder="ซอย"
            value={usAddress?.soi}
            onChange={onChange}
            name="soi"
          />
        </Col>

        <Col span={6} style={{ lineHeight: 1.25 }}>
          บ้านเลขที่ :
        </Col>
        <Col span={18}>
          <Input
            placeholder="บ้านเลขที่"
            value={usAddress?.address}
            onChange={onChange}
            name="address"
          />
        </Col>
      </Row>
    </Modal>
  );
};

const UICart = ({ itemCart, setItemCart, onBack }) => {
  const [total, setTotal] = useState({});
  const [isOpenModalAddy, setIsOpenModalAddy] = useState(false);
  const [userAddress, setUserAddress] = useState(getLineProfile());

  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  useEffect(() => {
    console.log("CART ==> ", itemCart);
    let price = 0;
    let amount = 0;
    if (itemCart.length > 0) {
      itemCart.map((item) => {
        price += item?.total;
        amount += item?.amount;
      });
    }
    setTotal({ amount, price });
  }, [itemCart]);

  const removeItem = (itemIndex) => {
    let nextCart = itemCart.filter((_, index) => itemIndex != index);
    setItemCart(nextCart);
    if (nextCart.length === 0) {
      onBack();
    }
  };

  const handleCloseModal = () => {
    setIsOpenModalAddy(false);
  };

  const handleChangeData = (event) => {
    let { name, value } = event.target;
    setUserAddress((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleUpdateAddress = () => {
    let reqData = {
      _id: userAddress?._id,
      soi: userAddress?.delivery_to?.soi,
      address: userAddress?.delivery_to?.address,
    };
    console.log(reqData);

    SaWeiService.updateAddress(reqData)
      .then((res) => {
        console.log(res);
        setIsOpenModalAddy(false);
      })
      .catch((err) => {});
  };

  const handleSubmitOrder = () => {
    console.log("CART ==> ", itemCart);
    console.log("ADDRESS ==> ", userAddress);
  };

  const renderChildList = (item) => {
    return (
      <Row>
        {item?.option && <Col span={24}>{item?.option.name}</Col>}
        {item?.info && <Col span={24}>{item?.info}</Col>}
        <Col span={24} style={{ color: "#29f" }}>
          Edit
        </Col>
      </Row>
    );
  };

  return (
    <>
      <div>
        <div
          className="site-card-border-less-wrapper"
          style={{ paddingBottom: "3rem" }}
        >
          <Card
            style={{
              backgroundColor: "#87735d",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <Row gutter={[16, 16]}>
              <Button
                style={{
                  borderRadius: "5px",
                  border: "1px solid white",
                  padding: "2px",
                  color: "white",
                  position: "absolute",
                  right: 10,
                  top: 10,
                  backgroundColor: "tan",
                }}
                icon={<EditOutlined />}
                onClick={() => setIsOpenModalAddy(true)}
              />
              <Col span={6}>
                <center>
                  <div
                    style={{
                      backgroundImage: `url(${getImgProfile()})`,
                      backgroundSize: "cover",
                      width: "81px",
                      height: "100px",
                      backgroundPosition: "center",
                      border: "1px solid white",
                      borderRadius: "8px",
                    }}
                  />
                </center>
              </Col>
              <Col
                span={18}
                style={{
                  color: "white",
                  paddingLeft: "1.5rem",
                  fontSize: "16px",
                }}
              >
                <h5
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "180px",
                  }}
                >
                  Line:{" "}
                  <span style={{ fontWeight: "normal" }}>{getName()}</span>
                </h5>

                <h5 style={{ margin: "4px 0px 0px 0px", fontSize: "14px" }}>
                  ที่อยู่จัดส่ง:
                </h5>
                <ul
                  style={{ margin: 0, paddingLeft: "20px", fontSize: "14px" }}
                >
                  <li>ซอย: {getSoi()}</li>
                  <li>บ้านเลขที่: {getAddress()}</li>
                </ul>
              </Col>
            </Row>
          </Card>

          <Card style={{ marginTop: "1rem" }}>
            <h4 style={{ margin: "5px 0px", fontSize: "16px" }}>รายการอาหาร</h4>
            {/* <Divider style={{ margin: "12px 0px 6px 0px" }} /> */}
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={itemCart}
              renderItem={(item, idx) => (
                <List.Item
                  style={{ padding: "12px 6px" }}
                  actions={[
                    <span style={{ marginRight: "15px", color: "black" }}>
                      ฿{item?.total}
                    </span>,
                    <Button
                      onClick={() => removeItem(idx)}
                      type="danger"
                      style={{
                        color: "white",
                        backgroundColor: "#e15a5a",
                        borderColor: "#e15a5a",
                        marginRight: "-8px",
                      }}
                      icon={<DeleteOutlined />}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={"x" + item?.amount}
                    title={<a href="https://ant.design">{item.name}</a>}
                    description={renderChildList(item)}
                  />
                </List.Item>
              )}
            />

            <h4 style={{ margin: "5px 0px", fontSize: "16px" }}>สรุปรายการ</h4>
            <Row style={{ padding: "0px 6px" }} gutter={[0, 4]}>
              <Col span={20}> ค่าอาหาร</Col>
              <Col span={4} style={{ textAlign: "right" }}>
                ฿{total?.price}
              </Col>

              <Col span={20}> ค่าส่ง (ฟรีหมู่บ้าน Grand Valley Village)</Col>
              <Col span={4} style={{ textAlign: "right" }}>
                ฿0
              </Col>
              <Col
                span={20}
                style={{
                  color: "#83633f",
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                ทั้งหมด
              </Col>
              <Col
                span={4}
                style={{
                  textAlign: "right",
                  color: "#83633f",
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontSize: "15px",
                }}
              >
                ฿{total?.price}
              </Col>
            </Row>
          </Card>

          <Card style={{ marginTop: "1rem" }}>
            <h4 style={{ margin: "5px 0px", fontSize: "16px" }}>
              วิธีชำระเงิน
            </h4>
            <Radio.Group onChange={onChange} value={value}>
              <Space direction="vertical">
                <Radio value={1}>เงินสด</Radio>
                <Radio value={2}>
                  โอนจ่าย{" "}
                  {value == 2 ? (
                    <Upload name="slip" action="/upload.do" listType="picture">
                      <Button icon={<UploadOutlined />}>แนบสลิป</Button>
                    </Upload>
                  ) : null}
                </Radio>
              </Space>
            </Radio.Group>
          </Card>
        </div>

        <div
          style={{
            height: "70px",
            width: "95%",
            color: "#FFD384",
            position: "fixed",
            bottom: 0,
            zIndex: 100,
            background: "white",
            display: "block",
          }}
        >
          <Button
            style={{
              width: "100%",
              textAlign: "left",
              backgroundColor: "#83633f",
              color: "white",
              height: "45px",
            }}
            onClick={handleSubmitOrder}
          >
            <center>ยืนยันคำสั่งซื้อ</center>
          </Button>
        </div>
      </div>

      {isOpenModalAddy && (
        <ModalEditAddress
          isOpen={isOpenModalAddy}
          onClose={handleCloseModal}
          usAddress={userAddress}
          onChange={handleChangeData}
          onSubmit={handleUpdateAddress}
        />
      )}
    </>
  );
};

UICart.propTypes = {};

export default UICart;
