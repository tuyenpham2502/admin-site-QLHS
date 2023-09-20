import Cookie from "src/core/application/common/models/Cookie";
import {NextPageContext} from "next";

export interface ICookieService {
    readCookie(context:NextPageContext):Cookie;
    setCookie(document:Document,cookie:Cookie);
}
