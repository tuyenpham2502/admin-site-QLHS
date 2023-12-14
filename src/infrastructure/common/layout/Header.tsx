import React, { useState } from "react";
import { MenuFoldOutlined } from "@ant-design/icons";

import logo from "assets/images/logo.png";
import Image from "next/image";
import { Layout, Row, Col } from "antd";
import styles from "assets/styles/common/layout/Header.module.css";
import router from "next/router";



const Header = ({
  context,
  translator,
  isHidden,
  isHiddenMenuMobile,
  ...props
}: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const [textSearch, setTextSearch] = useState("");

  

  const onChange = (e: any) => {
    setTextSearch(e.target.value);
  };

  const onClickLogo = () => {
    router.push("/");
  };

  const onBlurSearch = () => {
    setTextSearch(textSearch.trim());
  };
  
  return (
    <Layout.Header
      className={styles.header_main_layout_background}
      hidden={!isHidden}
    >
      <Row className={styles.header}>
        <Col onClick={onClickLogo} className={styles.header_left}>
          <Image
            src={logo}
            alt="logo"
            className={styles.header_logo}
          />
          <div className="wed-name">
                My film
              </div>
        </Col>
        <Col className={styles.header_collapse} onClick={()=>{

        }}>
          <MenuFoldOutlined style={{ color: "#FFFF", fontSize: "24px" }} />
        </Col>
      </Row>


    </Layout.Header>
  );
};

export default Header;
