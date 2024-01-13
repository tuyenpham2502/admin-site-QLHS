import {
    MenuTheme
} from "antd";
import { HomeOutlined, AppstoreOutlined, FolderOutlined, UserOutlined, CommentOutlined, StarOutlined } from '@ant-design/icons';
import Image from 'next/image'
import iconArrow from 'assets/icons/icon-arrow.png'
import Menu from "src/core/application/common/models/LeftMenu/Menu";
import MenuItem from "src/core/application/common/models/LeftMenu/MenuItem";
import { MenuKeys } from "src/core/domain/enums/MenuKeys";
import type { NotificationPlacement } from 'antd/es/notification/interface';
import GroupedMenuItem from "./models/LeftMenu/GroupedItem";



export default class Constant {
    static API_TOKEN_STORAGE: string = "API_TOKEN";

    static BaseUrlImage: string = `${process.env.NEXT_PUBLIC_API_URL}/FileStorage/GetFile`;

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
                    MenuKeys.Pages,
                    <FolderOutlined />,
                    "Pages",
                    "Pages",
                    [],
                    [
                        new MenuItem(
                            [],
                            MenuKeys.AddItem,
                            <Image src={iconArrow} alt='Arrow' />,
                            "Add item",
                            "Add item",
                            [],
                            "/pages/add-item"
                        ),
                        new MenuItem(
                            [],
                            MenuKeys.EditUser,
                            <Image src={iconArrow} alt='Arrow' />,
                            "Edit user",
                            "Edit user",
                            [],
                            "/pages/edit-user"
                        ),
                    ]
                ),
                new MenuItem(
                    [],
                    MenuKeys.Users,
                    <UserOutlined />,
                    "Users",
                    "Users",
                    [],
                    "/users/list"
                ),
                new MenuItem(
                    [],
                    MenuKeys.Comments,
                    <CommentOutlined />,
                    "Comments",
                    "Comments",
                    [],
                    "/comments/list"
                ),
                new MenuItem(
                    [],
                    MenuKeys.Reviews,
                    <StarOutlined />,
                    "Reviews",
                    "Reviews",
                    [],
                    "/reviews/list"
                ),
            ],
        )
    }

    static Logger = class {
        static DateTimeFormat = "yyyy-MM-DD HH:mm:ss.SSSS";
        static DateFormat = "yyyy-MM-DD";
    };

    static DashBoardTableItemsType = class {
        static TopItems = "TopItems";
        static LatestItems = "LatestItems";
        static LatestUsers = "LatestUsers";
        static LatestReviews = "LatestReviews";
    }

}