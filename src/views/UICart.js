import React from "react";
import { Card, Row, Col, Button, List, Avatar } from "antd";
import { getImgProfile, getName, getLineId } from "../utils/utility";
const { Meta } = Card;

const UICart = ({ itemCart }) => {
  console.log("cart -----> ", itemCart);

  const renderChildList = (item) => {
    return (
      <Row>
        {item?.option && <Col span={24}>{item?.option.name}</Col>}
        {item?.info && <Col span={24}>{item?.info}</Col>}
      </Row>
    );
  };

  return (
    <>
      <div>
        <div className="site-card-border-less-wrapper">
          <Card
            style={{
              backgroundColor: "tan",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={6}>
                <center>
                  <div
                    style={{
                      backgroundImage: `url(${getImgProfile()})`,
                      backgroundSize: "cover",
                      width: "81px",
                      height: "100px",
                      backgroundPosition: "center",
                      border: "2px solid white",
                      borderRadius: "8px",
                    }}
                  />
                </center>
              </Col>
              <Col
                span={18}
                style={{
                  color: "white",
                  padding: "5px 20px",
                  fontSize: "16px",
                }}
              >
                <div>ชื่อ: {getName()}</div>
                <div>ที่อยู่จัดส่ง: {getName()}</div>
              </Col>
            </Row>
          </Card>

          <Card
            title="รายการสั่งซื้อ"
            bordered={false}
            style={{
              width: "100%",
            }}
          >
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={itemCart}
              renderItem={(item) => (
                <List.Item
                  actions={[
                    <span style={{ marginRight: "15px", color: "black" }}>
                      ฿{item?.total}
                    </span>,
                    <Button
                      type="primary"
                      style={{
                        color: "white",
                        backgroundColor: "#fb8c00",
                        broderColor: "#fb8c00",
                      }}
                    >
                      แก้ไข
                    </Button>,
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

            {/* {itemCart?.map((item) => {
              return (
                <div>
                  <Row>
                    <Col span={8}>{` ${item?.amount} ชิ้น ${item?.name} `}</Col>
                    <Col span={8}>
                      {item?.option?.name ? item?.option?.name : ""}
                    </Col>
                    <Col span={4}>฿{item?.price * item?.amount}</Col>
                    <Col span={4}>
                      <Button type="primary" style={{backgroundColor:"chartreuse"}}>Primary</Button>
                    </Col>
                  </Row>
                </div>
              );
            })} */}
          </Card>
        </div>
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
        >
          <center>ยืนยันคำสั่งซื้อ</center>
        </Button>
      </div>
    </>
  );
};

UICart.propTypes = {};

export default UICart;
