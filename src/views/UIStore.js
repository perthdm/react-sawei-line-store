import React, { useEffect, useState } from "react";
import { Card, Row, Col, Modal, Button, List, Radio, Space, Input } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import SaWeiService from "services/SaWeiService";

const { Meta } = Card;
const { TextArea } = Input;
const MINUS = "minus";
const PLUS = "plus";

const ModalItem = ({ item, isOpen, onClose, onSubmit }) => {
  const [amount, setAmount] = useState(1);
  const [option, setOption] = useState();
  const [info, setInfo] = useState();
  const [error, setError] = useState();

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
    let data = {
      _id: item?._id,
      name: item?.name,
      info,
      amount,
      option,
      price: item?.price,
    };
    if (item?.option.length > 0) {
      if (!option) {
        return setError("กรุณาเลือกชนิดของสินค้า");
      }
      data["total"] = amount * option?.price;
    } else {
      data["total"] = amount * item?.price;
    }

    onSubmit(data);
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
            backgroundColor: "#83633f",
          }}
        >
          เพิ่มลงตระกร้า
        </Button>,
      ]}
    >
      {item?.option && (
        <>
          <h4>
            รสชาติ{" "}
            <span
              style={{
                fontSize: "14px",
                color: "#00000073",
                fontWeight: "normal",
              }}
            >
              (เลือก 1 ชนิด)
            </span>
          </h4>
          <Radio.Group
            onChange={({ target: { value } }) => {
              setError("");
              setOption(value);
            }}
          >
            <Space direction="vertical">
              {item?.option.map((optionItem) => {
                return (
                  <Radio
                    value={optionItem}
                    className="item-list-custom"
                    key={optionItem?._id}
                  >
                    <Row style={{ width: "100%" }}>
                      <Col span={20}>{optionItem?.name}</Col>
                      <Col span={4}>฿{optionItem?.price}</Col>
                    </Row>
                  </Radio>
                );
              })}
            </Space>
          </Radio.Group>
          {error && (
            <div style={{ color: "red", marginTop: "5px" }}>** {error}</div>
          )}
        </>
      )}
      <h4>
        ข้อความถึงผู้ขาย{" "}
        <span
          style={{
            fontSize: "14px",
            color: "#00000073",
            fontWeight: "normal",
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
            fontWeight: "normal",
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
            icon={<MinusOutlined style={{ color: "#83633f" }} />}
            onClick={() => handleChangeAmount("minus")}
          />
        </Col>
        <Col
          span={4}
          style={{
            textAlign: "center",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {amount}
        </Col>
        <Col span={10} style={{ textAlign: "left" }}>
          <Button
            className="sign-button"
            name="plus"
            icon={<PlusOutlined style={{ color: "#83633f" }} />}
            onClick={() => handleChangeAmount("plus")}
          />
        </Col>
      </Row>
    </Modal>
  );
};

const UIStore = ({ itemCart, setItemCart }) => {
  const [itemList, setItemList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await SaWeiService.getMenues();
      if (response?.status === 200) {
        let { data } = response;
        setItemList(data);
      }
    };

    fetchMenu();
  }, []);

  const handleSelected = (item) => {
    setIsModalOpen(true);
    setCurrentItem(item);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSubmit = (data) => {
    let nextData = [...itemCart, data];
    setItemCart(nextData);
    setIsModalOpen(false);
    console.log("SUBMIT");
  };

  return (
    <>
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
      </Row>

      {isModalOpen && (
        <ModalItem
          item={currentItem}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

UIStore.propTypes = {};

export default UIStore;
