import {NextPageContext} from "next";
import Cookie from "../common/models/Cookie";

export interface ILocalStorageService {
    readStorage(key: string): Cookie;
    setStorage(key: string, storage: Cookie);
}
