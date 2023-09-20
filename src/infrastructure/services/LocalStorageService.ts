import {ICookieService} from "src/core/application/services/ICookieService";
import Cookie from "src/core/application/common/models/Cookie";
import {NextPageContext} from "next";
import { ILocalStorageService } from "src/core/application/services/ILocalStorageService";

export default class LocalStorageService implements ILocalStorageService{
    readStorage(key: string): Cookie {
        if (typeof window != "undefined") {
            let storage = localStorage.getItem(key);
            if (storage && storage.length) {
                return new Cookie(
                    JSON.parse(storage).isAuthenticated, 
                    JSON.parse(storage).token,
                    JSON.parse(storage).refreshToken
                );
            }
        }
       
        return new Cookie(false, "", "");

    }

    setStorage( key: string, storage: Cookie,) {
        if (storage) {
            localStorage.setItem(key, JSON.stringify(storage));
        }
    }
}
