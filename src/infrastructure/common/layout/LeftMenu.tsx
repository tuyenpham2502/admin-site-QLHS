import React, { use, useState } from "react";
import logo from "assets/images/logo.svg";
import { LogoutOutlined } from "@ant-design/icons";
import { Layout, Col, Row } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  MenuUI,
  MenuItemUI,
  SubMenuUI,
} from "src/infrastructure/common/components/menu/menu";
import { MenuSubKeys } from "src/core/domain/enums/MenuKeys";
import MenuItem from "src/core/application/common/models/LeftMenu/MenuItem";
import Constant from "src/core/application/common/constants";
import styles from "assets/styles/common/layout/LeftMenu.module.css";
import GroupedMenuItem from "src/core/application/common/models/LeftMenu/GroupedItem";
import { useRecoilValue } from "recoil";
import { ProfileState } from "src/core/application/common/atoms/identity/account/ProfileState";
const LeftMenu = ({ context, translator, setIsHiddenLeftMenu, isHiddenLeftMenu }: any) => {
  const router = useRouter();
  const [openKeys, setOpenKeys] = useState(context?.openKeys);
  const [collapsed, setCollapsed] = useState(false);
  const root = Constant.MenuConfig.MainMenu;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const myProfileRef = useRecoilValue<any>(ProfileState);

  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find(
      (key: any) => openKeys?.indexOf(key) === -1
    );
    if (MenuSubKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  console.log("myProfileRef", myProfileRef);

  return (
    <Layout.Sider
      width={280}
      hidden={isHiddenLeftMenu}
      collapsed={collapsed}
      collapsible
      onCollapse={() => setCollapsed(!collapsed)}
      className={styles.layout_left_menu}
      breakpoint="xl"
      onBreakpoint={(broken: boolean) => {
        setIsHiddenLeftMenu(broken)
      }}
    >
      <div className={styles.layout_left_menu_sider_children}>
        <div className={styles.left_menu_logo}>
          <Image
            src={logo}
            alt="logo"
            width={collapsed ? 80 : 160}
            height={collapsed ? 60 : 80}
          />
        </div>
        {myProfileRef && (
          <Row className={styles.left_menu_profile_wrapper}>
            <Col>
              <img
                src={`${baseUrl}/FileStorage/${myProfileRef?.data?.avatar}`}
                className={styles.left_menu_avatar}
                alt="Avatar"
              />
            </Col>
            {!collapsed && (
              <>
                <Col className={styles.left_menu_profile}>
                  <div className={styles.left_menu_profile_role_text}>
                    {myProfileRef?.data?.role[0]}
                  </div>
                  <div className={styles.left_menu_profile_name_text}>
                    {myProfileRef?.data?.name}
                  </div>
                </Col>
                <Col className={styles.button_logout}>
                  <LogoutOutlined className={styles.icon_logout} />
                </Col>
              </>
            )}
          </Row>
        )}
        <div className={styles.left_menu_item}>
          <MenuUI
            theme={root.theme}
            mode={root.mode}
            defaultSelectedKeys={context?.defaultSelectedKeys}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
          >
            {root.items?.map((value: any) => {
              if (value.type === "item") {
                const item = value as MenuItem;
                return (
                  <MenuItemUI
                    key={item.key}
                    icon={item.icon}
                    onClick={() => {
                      router.push(item.hyperlink);
                    }}
                  >
                    {item.displayText}
                  </MenuItemUI>
                );
              } else if (value.type === "group") {
                const item = value as GroupedMenuItem;
                return (
                  <SubMenuUI
                    key={item.key}
                    icon={item.icon}
                    title={item.displayText}
                  >
                    {item.items?.map((sValue: any) => {
                      const item = sValue as MenuItem;
                      return (
                        <MenuItemUI
                          key={item.key}
                          icon={item.icon}
                          onClick={() => {
                            router.push(item.hyperlink);
                          }}
                        >
                          {item.displayText}
                        </MenuItemUI>
                      );
                    })}
                  </SubMenuUI>
                );
              }
            })}
          </MenuUI>
        </div>
      </div>
    </Layout.Sider>
  );
};

export default LeftMenu;
