import {
    MenuTheme
} from "antd";
import { HomeOutlined, AppstoreOutlined } from '@ant-design/icons';
import Image from 'next/image'
import iconDashBorad from 'assets/icons/icon-dashBoard.png'
import iconStudent from 'assets/icons/icon-student.png'
import iconArrow from 'assets/icons/icon-arrow.png'
import iconParents from 'assets/icons/icon-parents.png'
import iconTeacher from 'assets/icons/icon-teachers.png'
import iconAccount from 'assets/icons/icon-account.png'
import iconSubject from 'assets/icons/icon-subject.png'
import iconSetting from 'assets/icons/icon-setting.png'
import Menu from "src/core/application/common/models/LeftMenu/Menu";
import MenuItem from "src/core/application/common/models/LeftMenu/MenuItem";
import { MenuKeys } from "src/core/domain/enums/MenuKeys";
import type { NotificationPlacement } from 'antd/es/notification/interface';
import GroupedMenuItem from "./models/LeftMenu/GroupedItem";



export default class Constant {
    static API_TOKEN_STORAGE: string = "API_TOKEN";

    static ToastMessage = class {
        static Notification = class {
            static Position: NotificationPlacement = "topRight";
            static Duration: number = 3;
        };
        static Confirmation = class { };
    };

    static AppTheme: MenuTheme = "dark";

    static MenuConfig = class {
        static MainMenu = new Menu(
            Constant.AppTheme,
            "main-menu",
            [MenuKeys.Account],
            "inline",
            [
                new MenuItem(
                    [],
                    MenuKeys.Dashboard,
                    <HomeOutlined />,
                    "Dashboard",
                    "Dashboard",
                    [],
                    "/"
                ),
                new MenuItem(
                    [],
                    MenuKeys.Catalog,
                    <AppstoreOutlined />,
                    "Catalog",
                    "Catalog",
                    [],
                    "/catalog/list"
                ),
                new GroupedMenuItem(
                    [],
                    MenuKeys.Page,
                    <Image src={iconTeacher} alt='Page' />,
                    "Page",
                    "Page",
                    [],
                    [
                        new MenuItem(
                            [],
                            MenuKeys.AddItem,
                            <Image src={iconArrow} alt='Arrow' />,
                            "Add item",
                            "Add item",
                            [],
                            "/page/add-item"
                        ),
                        new MenuItem(
                            [],
                            MenuKeys.EditUser,
                            <Image src={iconArrow} alt='Arrow' />,
                            "Add Teachers",
                            "Add Teachers",
                            [],
                            "/teachers/add-teacher"
                        ),
                    ]
                ),
                new MenuItem(
                    [],
                    MenuKeys.Users,
                    <Image src={iconSubject} alt='Users' />,
                    "Users",
                    "Users",
                    [],
                    "/users"
                ),
                new MenuItem(
                    [],
                    MenuKeys.Comments,
                    <Image src={iconSetting} alt='Comments' />,
                    "Comments",
                    "Comments",
                    [],
                    "/comments"
                ),
                new MenuItem(
                    [],
                    MenuKeys.Reviews,
                    <Image src={iconSetting} alt='Comments' />,
                    "Reviews",
                    "Reviews",
                    [],
                    "/reviews"
                ),
            ],
        )
    }

    static Logger = class {
        static DateTimeFormat = "yyyy-MM-DD HH:mm:ss.SSSS";
        static DateFormat = "yyyy-MM-DD";
    };



}