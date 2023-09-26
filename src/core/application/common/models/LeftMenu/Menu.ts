import { MenuTheme } from "antd";
import Constants from 'src/core/application/common/Constants'

export default class Menu {
    constructor(theme: MenuTheme = Constants.AppTheme, key: string = '', defaultSelectedKeys: string[] = ['1'], mode: any = 'inline', children: any[]) {
        this.theme = theme;
        this.defaultSelectedKeys = defaultSelectedKeys;
        this.mode = mode;
        this.key = key;
        this.items = children;
    }
    theme: MenuTheme = "dark";
    defaultSelectedKeys: string[] = ['1'];
    key: string;
    mode: any = "inline";
    items: any[] // children of the menu
}   