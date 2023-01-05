import React, { useEffect, useState } from "react";
import { Card, Row, Col, Modal, Button, List, Radio, Space, Input } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
const { TextArea } = Input;

const MINUS = "minus";
const PLUS = "plus";

const MDItemInfo = ({ item, isOpen, onClose, onSubmit, isEdit }) => {
  const [amount, setAmount] = useState(item?.amount || 1);
  const [selectedType, setSelectedType] = useState(item?.selected);
  const [info, setInfo] = useState(item?.info || "");
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
    let { _id, name, option, price } = item;
    let data = {
      _id,
      name,
      info,
      amount,
      selected: selectedType,
      option,
      price
    };

    if (item?.option.length > 0) {
      if (!selectedType) {
        return setError("กรุณาเลือกชนิดของสินค้า");
      }
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
            backgroundColor: "#83633f"
          }}
        >
          {isEdit ? "ยืนยันการแก้ไข" : "เพิ่มลงตระกร้า"}
        </Button>
      ]}
    >
      {item?.option.length > 0 && (
        <>
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

          <Space direction="vertical" style={{ width: "100%" }}>
            {item?.option.map((optionItem) => {
              return (
                <Radio
                  className="item-list-custom"
                  key={optionItem?._id}
                  checked={selectedType?._id === optionItem?._id}
                  onChange={() => setSelectedType(optionItem)}
                >
                  <Row style={{ width: "100%" }}>
                    <Col span={20}>{optionItem?.name}</Col>
                    <Col span={4}>฿{optionItem?.price}</Col>
                  </Row>
                </Radio>
              );
            })}
          </Space>
          {error && (
            <div style={{ color: "red", marginTop: "5px" }}>** {error}</div>
          )}
        </>
      )}

      <h4>
        ข้อความถึงร้านค้า{" "}
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
            icon={<MinusOutlined style={{ color: "#83633f" }} />}
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
            icon={<PlusOutlined style={{ color: "#83633f" }} />}
            onClick={() => handleChangeAmount("plus")}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default MDItemInfo;
