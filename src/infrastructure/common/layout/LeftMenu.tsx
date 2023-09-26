import React, { useState } from "react";
import logo from 'assets/images/logo.png'
import { Layout } from "antd";
import { useRouter } from "next/router";
import Image from 'next/image'
import { MenuUI, MenuItemUI, SubMenuUI } from "src/infrastructure/common/components/menu/menu";
import { MenuSubKeys } from "src/core/domain/enums/MenuKeys";
import MenuItem from "src/core/application/common/models/LeftMenu/MenuItem";
import Constant from "src/core/application/common/constants";
import styles from 'assets/styles/common/layout/LeftMenu.module.css'
import GroupedMenuItem from "src/core/application/common/models/LeftMenu/GroupedItem";
const LeftMenu = ({ context, translator }: any) => {
    const router = useRouter();
    const [openKeys, setOpenKeys] = useState(context?.openKeys);
    const [collapsed, setCollapsed] = useState(false);
    const root = Constant.MenuConfig.MainMenu;

    const onOpenChange = (keys: any) => {
        const latestOpenKey = keys.find(((key: any) => openKeys?.indexOf(key) === -1));
        if (MenuSubKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };


    return (
        <Layout.Sider
            collapsed={collapsed}
            collapsible
            onCollapse={() => setCollapsed(!collapsed)}
            className={styles.layout_left_menu}

        >
            <div className={styles.layout_left_menu_sider_children}>
                <Image src={logo} alt="logo" width={collapsed ? 80 : 200} height={collapsed ? 60 : 200} />
                <div className={styles.left_menu_item}>
                    <MenuUI
                        theme={root.theme}
                        mode={root.mode}
                        defaultSelectedKeys={context?.defaultSelectedKeys}
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                    >
                        {root.items?.map((value: any) => {
                            if(value.type === 'item' ) {
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
                            )
                                }
                            else if (value.type === 'group') {
                                const item = value as GroupedMenuItem;
                                return (
                                    <SubMenuUI
                                        key={item.key}
                                        icon={item.icon}
                                        title={item.displayText}
                                    >
                                        {
                                            item.items?.map((sValue: any) => {
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
                                                )
                                            })
                                        }
                                    </SubMenuUI>
                                )
                            }
                        })}
                        
                    </MenuUI>
                </div>
            </div>

        </Layout.Sider>
    );
};

export default LeftMenu;