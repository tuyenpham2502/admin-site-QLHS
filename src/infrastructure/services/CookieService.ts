import {ICookieService} from "src/core/application/services/ICookieService";
import Cookie from "src/core/application/common/models/Cookie";
import {NextPageContext} from "next";
import cookies from "next-cookies";

export default class CookieService implements ICookieService{
    readCookie(context: NextPageContext): Cookie {
        let allCookies= cookies(context);
        if(allCookies){
            return new Cookie(allCookies.isAuthenticated=="true",allCookies.token,allCookies.refreshToken)
        }
        return new Cookie(false,"","");
    }

    setCookie(document: Document, cookie: Cookie) {
        document.cookie=`isAuthenticated=${cookie.isAuthenticated} ;path=/; secure; SameSite=None`;
        document.cookie=`token=${cookie.token} ;path=/; secure; SameSite=None`;
        document.cookie=`refreshToken=${cookie.refreshToken} ;path=/; secure; SameSite=None`;
    }
}
