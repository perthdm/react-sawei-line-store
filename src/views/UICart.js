import React from "react";
import { Card, Row, Col, Button } from "antd";
import { getImgProfile, getName, getLineId } from "../utils/utility";
const { Meta } = Card;

const UICart = ({ itemCart }) => {
  console.log("cart -----> ", itemCart);

  return (
    <>
      <div>
        <div className="site-card-border-less-wrapper">
          <Card
            hoverable
            style={{ width: "100%" }}
            cover={<img alt="example" src={getImgProfile()} />}
          >
            <Meta title={getName()} />
          </Card>

          <Card
            title="รายการสั่งซื้อ"
            bordered={false}
            style={{
              width: "100%",
            }}
          >
            {itemCart?.map((item) => {
              return (
                <div>
                  <Row>
                    <Col span={8}>{` ${item?.amount} ชิ้น ${item?.name} `}</Col>
                    <Col span={8}>
                      {item?.option?.name ? item?.option?.name : ""}
                    </Col>
                    <Col span={8}>฿{item?.price * item?.amount}</Col>
                  </Row>
                </div>
              );
            })}
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
