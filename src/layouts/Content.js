import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col } from "antd";

import UIStore from "views/UIStore";
import UICart from "../views/UICart";
import UIHistory from "../views/UIHistory";

const Content = ({ active }) => {
  const renderContent = () => {
    switch (active) {
      case 1:
        return <UIStore />;
      case 2:
        return <UICart />;
      default:
        return <UIHistory />;
    }
  };

  return (
    <div
      style={{
        maxHeight: "90vh",
        overflowY: "scroll",
        padding: "1rem 0.5rem 0rem 0.5rem"
      }}
    >
      {renderContent()}
    </div>
  );
};

Content.propTypes = {};

export default Content;
