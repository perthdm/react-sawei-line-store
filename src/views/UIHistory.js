import React from "react";
import { Card, Empty } from "antd";
import PropTypes from "prop-types";
import maintenanceImage from "assets/image/maintenance.png";

const UIHistory = () => {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Card
        style={{ width: "310px", borderRadius: "10px", borderColor: "#e2e2e2" }}
      >
        <Empty
          image={maintenanceImage}
          imageStyle={{
            height: 150,
            width: "auto"
          }}
          description={
            <span style={{ color: "#999999", fontSize: "18px" }}>
              ประวัติคำสั่งซื้อ
            </span>
          }
        >
          <span style={{ color: "#ff4e5a", fontSize: "14px" }}>
            *กำลังปรับปรุงระบบ*
          </span>
        </Empty>
      </Card>
    </div>
  );
};

UIHistory.propTypes = {};

export default UIHistory;
