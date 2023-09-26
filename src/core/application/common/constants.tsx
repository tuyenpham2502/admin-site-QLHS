import {
    MenuTheme
} from "antd";
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
                    <Image src={iconDashBorad} alt='Dashboard' />,
                    "Dashboard",
                    "Dashboard",
                    [],
                    "/"
                ),
                new GroupedMenuItem(
                    [],
                    MenuKeys.Student,
                    <Image src={iconStudent} alt='Student' />,
                    "Students",
                    "Students",
                    [],
                    [
                        new MenuItem(
                            [],
                            MenuKeys.AllStudents,
                            <Image src={iconArrow} alt='Arrow' />,
                            "All Students",
                            "All Students",
                            [],
                            "/account/all-student"
                        ),
                        new MenuItem(
                            [],
                            MenuKeys.AddStudent,
                            <Image src={iconArrow} alt='Arrow' />,
                            "Add Students",
                            "Add Students",
                            [],
                            "/account/add-student"
                        ),
                        new MenuItem(
                            [],
                            MenuKeys.StudentPromotion,
                            <Image src={iconArrow} alt='Arrow' />,
                            "Students Promotion",
                            "Students Promotion",
                            [],
                            "/account/edit-student"
                        )
                    ]
                ),
                new MenuItem(
                    [],
                    MenuKeys.Parents,
                    <Image src={iconParents} alt='Parents' />,
                    "Parents",
                    "Parents",
                    [],
                    "/parents"
                ),
                new GroupedMenuItem(
                    [],
                    MenuKeys.Teachers,
                    <Image src={iconTeacher} alt='Teachers' />,
                    "Teachers",
                    "Teachers",
                    [],
                    [
                        new MenuItem(
                            [],
                            MenuKeys.AllTeachers,
                            <Image src={iconArrow} alt='Arrow' />,
                            "All Teachers",
                            "All Teachers",
                            [],
                            "/teachers/all-teacher"
                        ),
                        new MenuItem(
                            [],
                            MenuKeys.AddTeacher,
                            <Image src={iconArrow} alt='Arrow' />,
                            "Add Teachers",
                            "Add Teachers",
                            [],
                            "/teachers/add-teacher"
                        ),
                    ]
                ),
                new GroupedMenuItem(
                    [],
                    MenuKeys.Account,
                    <Image src={iconAccount} alt='Account' />,
                    "Account",
                    "Account",
                    [],
                    [
                        new MenuItem(
                            [],
                            MenuKeys.FeesGroup,
                            <Image src={iconArrow} alt='Arrow' />,
                            "Fees Group",
                            "Fees Group",
                            [],
                            "/account/fees-group"
                        ),
                        new MenuItem(
                            [],
                            MenuKeys.StudentFees,
                            <Image src={iconArrow} alt='Arrow' />,
                            "Student Fees",
                            "Student Fees",
                            [],
                            "/account/student-fees",
                        ),
                        new MenuItem(
                            [],
                            MenuKeys.Expenses,
                            <Image src={iconArrow} alt='Arrow' />,
                            "Expenses",
                            "Expenses",
                            [],
                            "/account/expenses"
                        ),
                        new MenuItem(
                            [],
                            MenuKeys.AddExpenses,
                            <Image src={iconArrow} alt='Arrow' />,
                            "Add Expenses",
                            "Add Expenses",
                            [],
                            "/account/add-expenses"
                        ),
                        ]
                ),
                new MenuItem(
                    [],
                    MenuKeys.Subject,
                    <Image src={iconSubject} alt='Subject' />,
                    "Subject",
                    "Subject",
                    [],
                    "/subject"
                ),
                new MenuItem(
                    [],
                    MenuKeys.Settings,
                    <Image src={iconSetting} alt='Settings' />,
                    "Settings",
                    "Settings",
                    [],
                    "/settings"
                ),
            ],
        )
    }

    static Logger = class {
        static DateTimeFormat = "yyyy-MM-DD HH:mm:ss.SSSS";
        static DateFormat = "yyyy-MM-DD";
    };



}