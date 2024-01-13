import React, { use, useState } from "react";
import logo from "assets/images/logo.png";
import { LogoutOutlined } from "@ant-design/icons";
import { Layout, Col, Row, Drawer } from "antd";
import { NextRouter, useRouter } from "next/router";
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
import { AccountManagementService } from "src/infrastructure/identity/account/service/AccountManagementService";
import Endpoint from "src/core/application/common/Endpoint";

const LogoutAsync = async (
  context: any,
  params: any,
  router: NextRouter,
  setIsLoading: Function
) => {
  try {
    let response = await new AccountManagementService().logoutAsync(
      Endpoint.AccountManagement.logout,
      {},
      context
    );
    if (response.status == 200) {
      router.push("/account/sign-in.html");
    }
  } catch (error) {
    throw error;
  }
};

const LeftMenu = ({ context, translator, setIsHiddenLeftMenu, isHiddenLeftMenu }: any) => {
  const router = useRouter();
  const [openKeys, setOpenKeys] = useState(context?.openKeys);
  const [isLoading, setIsLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const root = Constant.MenuConfig.MainMenu;
  const myProfileRef = useRecoilValue<any>(ProfileState);
  const baseUrl = Constant.BaseUrlImage;
  
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

  const signOut = async () => {
    await LogoutAsync(context, {}, router, setIsLoading);
  };

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
            className={styles.left_menu_logo_image}
          />
          <div className={"wed-name"}>
            My film
          </div>
        </div>
        {myProfileRef && (
          <Row className={styles.left_menu_profile_wrapper}>
            <Col>
              <img
                src={`${baseUrl}/${myProfileRef?.data?.avatar}`}
                className={styles.left_menu_avatar}
                alt="Avatar"
              />
            </Col>
            {!collapsed && (
              <>
                <Col className={styles.left_menu_profile}>
                  <div className={styles.left_menu_profile_role_text}>
                    {myProfileRef?.data.roles[0]}
                  </div>
                  <div className={styles.left_menu_profile_name_text}>
                    {myProfileRef?.data.firstName} {myProfileRef?.data?.lastName}
                  </div>
                </Col>
                <Col className={styles.button_logout} onClick={signOut}>
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
        <Layout.Sider
          width={280}
        >
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
          </Layout.Sider>
    </Layout.Sider>
  );
};

export default LeftMenu;
