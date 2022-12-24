import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faClock,
  faAddressBook,
  faCartShopping
} from "@fortawesome/free-solid-svg-icons";

// base-color #FF884B
// inactive #818c9d

const Footer = ({ active, setActive }) => {
  return (
    <div
      style={{
        minHeight: "7vh",
        color: "#FFD384",
        position: "fixed",
        width: "100%",
        bottom: 0,
        zIndex: 100,
        background: "transparent",
      }}
    >
      <Row
        style={{
          height: "7vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Col
          span={6}
          onClick={() => setActive(1)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={
              active === 1
                ? {
                    backgroundColor: "#FFD384",
                    width: "50px",
                    height: "50px",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%"
                  }
                : {}
            }
          >
            <FontAwesomeIcon icon={faStore} size="xl" />
          </div>
        </Col>
        <Col
          span={6}
          onClick={() => setActive(2)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            style={
              active === 2
                ? {
                    backgroundColor: "#FFD384",
                    width: "50px",
                    height: "50px",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%"
                  }
                : {}
            }
          >
            <FontAwesomeIcon icon={faCartShopping} size="xl" />
          </div>
        </Col>
        <Col
          span={6}
          onClick={() => setActive(3)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {" "}
          <div
            style={
              active === 3
                ? {
                    backgroundColor: "#FFD384",
                    width: "50px",
                    height: "50px",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%"
                  }
                : {}
            }
          >
            <FontAwesomeIcon icon={faClock} size="xl" />
          </div>
        </Col>
        <Col
          span={6}
          onClick={() => setActive(4)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {" "}
          <div
            style={
              active === 4
                ? {
                    backgroundColor: "#FFD384",
                    width: "50px",
                    height: "50px",
                    color: "white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%"
                  }
                : {}
            }
          >
            <FontAwesomeIcon icon={faAddressBook} size="xl" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

Footer.propTypes = {};

export default Footer;
