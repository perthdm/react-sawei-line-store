import React, { useEffect, useState } from "react";
import { Card, Row, Col } from "antd";
import MDItemInfo from "components/Modal/MDItemInfo";
import SaWeiService from "services/SaWeiService";

const { Meta } = Card;

const UIStore = ({ itemCart, setItemCart }) => {
  const [itemList, setItemList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await SaWeiService.getMenues();
      if (response?.status === 200) {
        let { data } = response;
        data.sort((a, b) => {
          return b["is_active"] - a["is_active"];
        });
        data.sort((a, b) => {
          return b["recommended"] - a["recommended"];
        });
        setItemList(data);
      }
    };

    fetchMenu();
  }, []);

  const handleSelected = (item) => {
    if (!item?.is_active) {
      return;
    }
    setIsModalOpen(true);
    setCurrentItem(item);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentItem(null);
  };

  const handleSubmit = (data) => {
    let nextItemCart = [...itemCart];

    if (nextItemCart.length === 0) {
      nextItemCart = [...itemCart, data];
    } else if (nextItemCart.length > 0) {
      let isDup = false;
      nextItemCart.map((item) => {
        if (data?._id === item._id) {
          if (data.selected) {
            if (
              data.selected._id === item.selected._id &&
              data.info === item.info
            ) {
              item["amount"] += data?.amount;
              isDup = true;
            }
          } else if (data?.info === item.info) {
            item["amount"] += data?.amount;
            isDup = true;
          }
        }
      });

      if (!isDup) {
        nextItemCart = [...itemCart, data];
      }
    }
    setItemCart(nextItemCart);
    setIsModalOpen(false);
  };

  return (
    <div style={{ padding: "0rem 1.15%" }}>
      <Row gutter={[12, 16]}>
        {itemList?.map((item, idx) => {
          return (
            <Col lg={4} md={8} xs={12} key={item + "-" + idx}>
              <Card
                hoverable
                style={{ width: "100%" }}
                cover={
                  <>
                    <img
                      alt="example"
                      src={item?.img_url}
                      style={{
                        height: "200px",
                        filter: item?.is_active
                          ? "grayscale(0%)"
                          : "grayscale(100%)",
                      }}
                    />
                    {/* recommended */}
                    {item?.recommended && (
                      <div
                        style={{
                          width: "60px",
                          height: "25px",
                          background: "#d4380d",
                          position: "absolute",
                          right: "5px",
                          top: "5px",
                          borderRadius: "100px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          fontSize: "14px",
                          fontWeight: "bold",
                          border: "2px solid white",
                        }}
                      >
                        แนะนำ
                      </div>
                    )}
                  </>
                }
                onClick={() => handleSelected(item)}
              >
                <Meta
                  title={item?.name}
                  description={`ราคาเริ่มต้น ${item?.price} บาท`}
                />
              </Card>
            </Col>
          );
        })}
      </Row>

      {isModalOpen && (
        <MDItemInfo
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
