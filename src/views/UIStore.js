import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col, Modal, Button, List, Radio, Space, Input } from "antd";
import axios from "axios";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

const { Meta } = Card;
const { TextArea } = Input;
const MINUS = "minus";
const PLUS = "plus";

const ModalItem = ({ item, isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState(1);
  const [taste, setTaste] = useState("original");
  const [info, setInfo] = useState();

  const handleChangeAmount = (type) => {
    let nextAmount = amount;
    if (type === MINUS) {
      if (nextAmount > 1) {
        nextAmount -= 1;
        setAmount(nextAmount);
      }
    } else if (type === PLUS) {
      if (nextAmount < 99) {
        nextAmount += 1;
        setAmount(nextAmount);
      }
    }
  };

  const handleBeforeSubmit = () => {
    let data = { _id: item?._id, name: item?.name, info, amount, taste };
    console.log(data);
  };

  return (
    <Modal
      title={item?.name}
      open={isOpen}
      onCancel={onClose}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={handleBeforeSubmit}
          style={{
            width: "100%",
            height: "40px",
            backgroundColor: "#5031cc"
          }}
        >
          เพิ่มลงตระกร้า
        </Button>
      ]}
    >
      <h4>
        รสชาติ{" "}
        <span
          style={{
            fontSize: "14px",
            color: "#00000073",
            fontWeight: "normal"
          }}
        >
          (เลือก 1 ชนิด)
        </span>
      </h4>
      <Radio.Group
        onChange={({ target: { value } }) => {
          setTaste(value);
        }}
      >
        <Space direction="vertical">
          <Radio defaultChecked={"original"} className="item-list-custom">
            <Row style={{ width: "100%" }}>
              <Col span={20}>ธรรมดา</Col>
              <Col span={4}>฿10</Col>
            </Row>
          </Radio>
          <Radio value={"spicy"} className="item-list-custom">
            <Row style={{ width: "100%" }}>
              <Col span={20}>หม่าล่า</Col>
              <Col span={4}>฿12</Col>
            </Row>
          </Radio>
        </Space>
      </Radio.Group>

      <h4>
        ข้อความถึงผู้ขาย{" "}
        <span
          style={{
            fontSize: "14px",
            color: "#00000073",
            fontWeight: "normal"
          }}
        >
          (ใส่หรือไม่ใส่ก็ได้)
        </span>
      </h4>
      <TextArea
        showCount
        maxLength={100}
        style={{ height: 100, resize: "none" }}
        onChange={({ target: { value } }) => setInfo(value)}
        value={info}
      />

      <h4>
        จำนวน{" "}
        <span
          style={{
            fontSize: "14px",
            color: "#00000073",
            fontWeight: "normal"
          }}
        >
          (จำนวนที่ต้องการสั่งซื้อ)
        </span>
      </h4>
      <Row style={{ marginBottom: "20px" }}>
        <Col span={10} style={{ textAlign: "right" }}>
          <Button
            className="sign-button"
            name="minus"
            icon={<MinusOutlined style={{ color: "#5031cc" }} />}
            onClick={() => handleChangeAmount("minus")}
          />
        </Col>
        <Col
          span={4}
          style={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          {amount}
        </Col>
        <Col span={10} style={{ textAlign: "left" }}>
          <Button
            className="sign-button"
            name="plus"
            icon={<PlusOutlined style={{ color: "#5031cc" }} />}
            onClick={() => handleChangeAmount("plus")}
          />
        </Col>
      </Row>
    </Modal>
  );
};

const UIStore = () => {
  const [itemList, setItemList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await axios.get("http://192.168.1.123:3000/menu");
      console.log(response);
      if (response?.status === 200) {
        let { data } = response;
        setItemList(data);
      }
    };

    fetchMenu();
  }, []);

  const handleSelected = (item) => {
    console.log(item);
    setIsModalOpen(true);
    setCurrentItem(item);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSubmit = () => {
    console.log("SUBMIT");
    setIsModalOpen(false);
  };

  return (
    <div>
      <Row gutter={[16, 16]}>
        {itemList?.map((item, idx) => {
          return (
            <Col lg={4} xs={12} key={item + "-" + idx}>
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={
                  <img
                    alt="example"
                    src={item?.img_url}
                    style={{ height: "200px" }}
                  />
                }
                onClick={() => handleSelected(item)}
              >
                <Meta title={item?.name} description={`ราคาเริ่มต้น 10 บาท`} />
              </Card>
            </Col>
          );
        })}

        <Col lg={4} xs={12}>
          <Card
            hoverable
            style={{ width: "100%" }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col lg={4} xs={12}>
          <Card
            hoverable
            style={{ width: "100%" }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col lg={4} xs={12}>
          <Card
            hoverable
            style={{ width: "100%" }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col lg={4} xs={12}>
          <Card
            hoverable
            style={{ width: "100%" }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
        <Col lg={4} xs={12}>
          <Card
            hoverable
            style={{ width: "100%" }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </Col>
      </Row>

      {isModalOpen && (
        <ModalItem
          item={currentItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

UIStore.propTypes = {};

export default UIStore;
