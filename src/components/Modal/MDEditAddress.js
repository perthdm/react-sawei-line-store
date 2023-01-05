import React from "react";
import { Row, Col, Button, Modal, Input } from "antd";

const MDEditAddress = ({ isOpen, onClose, usAddress, onChange, onSubmit }) => {
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
            height: "35px"
          }}
          onClick={onSubmit}
        >
          บันทึก
        </Button>
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

export default MDEditAddress;
