import React, { useEffect, useState } from "react";
import { Card, Row, Col, Button, List, Radio, Space, message } from "antd";
import { getLineProfile, setStorage } from "../../utils/utility";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import SaWeiService from "services/SaWeiService";
import MDItemInfo from "components/Modal/MDItemInfo";
import MDEditAddress from "components/Modal/MDEditAddress";
import krungthaiImage from "assets/image/krung-thai.png";
import promptImage from "assets/image/prompt.png";
import Swal from "sweetalert2";

const UICart = ({
  itemCart,
  setItemCart,
  onBack,
  sumData,
  payment,
  setPayment
}) => {
  const [isOpenModalAddy, setIsOpenModalAddy] = useState(false);
  const [profile, setProfile] = useState(getLineProfile());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});
  const [cart, setCart] = useState();
  const [currentIdx, setCurrentIdx] = useState();

  useEffect(() => {
    setCart([...itemCart]);
  }, [itemCart]);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setPayment(e.target.value);
  };

  const removeItem = (itemIndex) => {
    let nextCart = itemCart.filter((_, index) => itemIndex != index);
    setItemCart(nextCart);
    if (nextCart.length === 0) {
      onBack();
    }
  };

  const handleCloseModal = () => {
    setCurrentIdx(undefined);
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleCloseModalAddress = () => {
    setIsOpenModalAddy(false);
  };

  const handleChangeData = (event) => {
    let { name, value } = event.target;
    setProfile((prevState) => ({
      ...prevState,
      delivery_to: { ...prevState.delivery_to, [name]: value }
    }));
  };

  const handleUpdateAddress = () => {
    let reqData = {
      customer_id: profile?._id,
      ...profile?.delivery_to
    };
    console.log("user address -----> ", profile);

    SaWeiService.updateAddress(reqData)
      .then(() => {
        setStorage("soi", reqData.soi);
        setStorage("address", reqData.address);
        setIsOpenModalAddy(false);
        Swal.fire("สำเร็จ", "บันทึกข้อมูลจัดส่งเรียบร้อยแล้ว", "success");
      })
      .catch(() => {
        Swal.fire("ผิดพลาด", "ไม่สามารถบันทึกข้อมูลจัดส่งได้", "error");
      });
  };

  const handleCopyData = (text) => {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    message.success(`[คัดลอก] เลขบัญชี ${text}`);
  };

  const handleSetEdit = (item, index) => {
    setCurrentIdx(index);
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  const mergeItem = (list) => {
    let array = [];
    if (list.length > 0) {
      list.map((item, index) => {
        if (index === 0) {
          array.push(item);
        } else {
          let dup = false;
          array.map((pItem) => {
            if (item._id === pItem._id) {
              if (item.selected) {
                if (
                  item.selected._id === pItem.selected._id &&
                  item.info === pItem.info
                ) {
                  pItem["amount"] += item["amount"];
                  dup = true;
                }
              } else if (item.info === pItem.info) {
                pItem["amount"] += item["amount"];
                dup = true;
              }
            }
          });

          if (!dup) {
            array = [...array, item];
          }
        }
      });
    }
    return array;
  };

  const handleUpdateCart = (data) => {
    let nextCart = [...itemCart];
    nextCart[currentIdx] = data;
    setItemCart(mergeItem(nextCart));
    setIsModalOpen(false);
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
              padding: "10px"
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
                  backgroundColor: "tan"
                }}
                icon={<EditOutlined />}
                onClick={() => setIsOpenModalAddy(true)}
              />
              <Col span={6}>
                <center>
                  <div
                    style={{
                      backgroundImage: `url(${profile?.img})`,
                      backgroundSize: "cover",
                      width: "81px",
                      height: "100px",
                      backgroundPosition: "center",
                      border: "1px solid white",
                      borderRadius: "8px"
                    }}
                  />
                </center>
              </Col>
              <Col
                span={18}
                style={{
                  color: "white",
                  paddingLeft: "1.5rem",
                  fontSize: "16px"
                }}
              >
                <h5
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "180px"
                  }}
                >
                  Line:{" "}
                  <span style={{ fontWeight: "normal" }}>{profile?.name}</span>
                </h5>

                <h5 style={{ margin: "4px 0px 0px 0px", fontSize: "14px" }}>
                  ที่อยู่จัดส่ง:
                </h5>
                <ul
                  style={{ margin: 0, paddingLeft: "20px", fontSize: "14px" }}
                >
                  <li>
                    ซอย:{" "}
                    {profile?.delivery_to?.soi !== "empty" ? (
                      profile?.delivery_to?.soi
                    ) : (
                      <span style={{ color: "#ffd177" }}>
                        {" "}
                        *กรุณากรอกข้อมูล
                      </span>
                    )}
                  </li>
                  <li>
                    บ้านเลขที่:{" "}
                    {profile?.delivery_to?.address !== "empty" ? (
                      profile?.delivery_to?.address
                    ) : (
                      <span style={{ color: "#ffd177" }}>
                        {" "}
                        *กรุณากรอกข้อมูล
                      </span>
                    )}
                  </li>
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
              dataSource={cart}
              renderItem={(item, idx) => (
                <List.Item
                  style={{ padding: "12px 6px" }}
                  actions={[
                    <span style={{ marginRight: "15px", color: "black" }}>
                      ฿
                      {item?.selected
                        ? item?.selected?.price * item?.amount
                        : item?.price * item?.amount}
                    </span>,
                    <Button
                      onClick={() => removeItem(idx)}
                      type="danger"
                      style={{
                        color: "white",
                        backgroundColor: "#e15a5a",
                        borderColor: "#e15a5a",
                        marginRight: "-8px"
                      }}
                      icon={<DeleteOutlined />}
                    />
                  ]}
                >
                  <List.Item.Meta
                    avatar={"×" + item?.amount}
                    title={<span>{item.name}</span>}
                    description={
                      <Row>
                        {item?.selected && (
                          <Col span={24}>{item?.selected.name}</Col>
                        )}
                        {item?.info && <Col span={24}>{item?.info}</Col>}
                        <Col
                          span={24}
                          style={{ color: "#29f" }}
                          onClick={() => handleSetEdit(item, idx)}
                        >
                          Edit
                        </Col>
                      </Row>
                    }
                  />
                </List.Item>
              )}
            />

            <h4 style={{ margin: "5px 0px", fontSize: "16px" }}>สรุปรายการ</h4>
            <Row style={{ padding: "0px 6px" }} gutter={[0, 4]}>
              <Col span={20}> ค่าอาหาร</Col>
              <Col span={4} style={{ textAlign: "right" }}>
                ฿{sumData?.price}
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
                  fontSize: "15px"
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
                  fontSize: "15px"
                }}
              >
                ฿{sumData?.price}
              </Col>
            </Row>
          </Card>

          <Card style={{ marginTop: "1rem" }}>
            <h4 style={{ margin: "5px 0px", fontSize: "16px" }}>
              ช่องทางการชำระเงิน
            </h4>
            <Radio.Group onChange={onChange} value={payment}>
              <Space direction="vertical">
                <Radio value={1}>เงินสด </Radio>
                <Radio value={2}>พร้อมเพย์ / ธนาคาร</Radio>
              </Space>
            </Radio.Group>

            {payment === 2 && (
              <div>
                <Card
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                    backgroundColor: "#023d6a"
                  }}
                >
                  <Row gutter={[16, 8]}>
                    <Col span={6}>
                      <center style={{ paddingTop: "5px" }}>
                        <img src={promptImage} width="50px" height="auto" />
                      </center>
                    </Col>
                    <Col span={18} style={{ color: "white", fontSize: "14px" }}>
                      <h4 style={{ fontSize: "16px", margin: 0 }}>พร้อมเพย์</h4>
                      <div>เลขที่บัญชี : 0807350067</div>
                      <div>กมลกรณ์ ใจเย็น</div>
                    </Col>
                    <Col span={24} style={{ color: "white" }}>
                      <center>
                        <Button
                          style={{ width: "95%" }}
                          onClick={() => handleCopyData("0807350067")}
                        >
                          คัดลอกเลขบัญชี
                        </Button>
                      </center>
                    </Col>
                  </Row>
                </Card>

                <Card
                  style={{
                    marginTop: "10px",
                    borderRadius: "10px",
                    backgroundColor: "#049cda",
                    minHeight: "120px"
                  }}
                >
                  <Row gutter={[16, 8]}>
                    <Col span={6}>
                      <center style={{ paddingTop: "5px" }}>
                        <img src={krungthaiImage} width="50px" height="auto" />
                      </center>
                    </Col>
                    <Col span={18} style={{ color: "white", fontSize: "14px" }}>
                      <h4 style={{ fontSize: "16px", margin: 0 }}>
                        ธนาคารกรุงไทย
                      </h4>
                      <div>เลขที่บัญชี : 2720244392</div>
                      <div>กมลกรณ์ ใจเย็น</div>
                    </Col>
                    <Col span={24} style={{ color: "white" }}>
                      <center>
                        <Button
                          style={{ width: "95%" }}
                          onClick={() => handleCopyData("2720244392")}
                        >
                          คัดลอกเลขบัญชี
                        </Button>
                      </center>
                    </Col>
                  </Row>
                </Card>
              </div>
            )}
          </Card>
        </div>
      </div>

      {isOpenModalAddy && (
        <MDEditAddress
          isOpen={isOpenModalAddy}
          onClose={handleCloseModalAddress}
          usAddress={profile}
          onChange={handleChangeData}
          onSubmit={handleUpdateAddress}
        />
      )}

      {isModalOpen && (
        <MDItemInfo
          item={currentItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleUpdateCart}
          isEdit={true}
        />
      )}
    </>
  );
};

UICart.propTypes = {};

export default UICart;
