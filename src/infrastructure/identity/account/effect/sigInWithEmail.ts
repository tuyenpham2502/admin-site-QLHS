import Endpoint from "src/core/application/common/Endpoint";
import { AccountManagementService } from "./../service/AccountManagementService";
import { SignInWithEmailRequest } from "src/core/application/dto/identity/account/request/signInWithEmail";
import Cookie from "src/core/application/common/models/Cookie";
import { NextRouter } from "next/router";
import LoggerService from "src/infrastructure/services/LoggerService";
import LocalStorageService from "src/infrastructure/services/LocalStorageService";
import SuccessResponse from "src/core/application/dto/common/responses/SuccessResponse";
import { Roles } from "src/core/domain/enums/Roles";
import { setRecoilStateAsync } from "src/infrastructure/common/libs/recoil-outside/Service";
import Constant from "src/core/application/common/constants";
import {
  ProfileState,
  RolesState,
  UserIdState,
} from "src/core/application/common/atoms/identity/account/ProfileState";
import { notifyInfo } from "src/infrastructure/common/components/controls/toast/toast-message";
import InvalidModelStateResponse from "src/core/application/dto/common/responses/InvalidModelStateResponse";

export const signInWithEmailAsync = async (
  email: string,
  password: string,
  cookie: Cookie
) => {
  try {
    let response = await new AccountManagementService().signInWithEmailAsync(
      Endpoint.AccountManagement.signInWithEmail,
      new SignInWithEmailRequest(email, password),
      cookie
    );
    if (response.status == 200) {
      return response;
    }
  } catch (e) {
    throw e;
  }
};

export const getMyProfileAsync = async (
  t: any,
  cookie: Cookie,
  router: NextRouter,
  loggerService: LoggerService,
  setLoading: Function
) => {
  try {
    const localStorageService = new LocalStorageService();
    let response = await new AccountManagementService().getMyProfileAsync(
      Endpoint.AccountManagement.getMyProfile,
      {},
      cookie
    );
    if (response.status == 200) {
      let arrRoles = (response as SuccessResponse)?.data.getMyProfile.user.role;
      // if (arrRoles[0].toUpperCase() == Roles.User) {
      //   notifyInfo(t,"Bạn không có quyền truy cập vào trang này");
      //   localStorageService.setStorage(
      //     Constant.API_TOKEN_STORAGE,
      //     new Cookie(false, "", "")
      //   );
      //   setRecoilStateAsync(ProfileState, {
      //     data: {},
      //   });
      //   router.push("/account/sign-in.html");
      // } else {
        setRecoilStateAsync(ProfileState, {
          data: (response as SuccessResponse)?.data.getMyProfile.user,
        });
        setRecoilStateAsync(UserIdState, {
          data: (response as SuccessResponse)?.data.getMyProfile.user.userId,
        });

        setRecoilStateAsync(RolesState, {
          data: (response as SuccessResponse)?.data.getMyProfile.user.role,
        });

        router.push("/");
        setTimeout(() => {
        setLoading(false);
      }, 300);
    // }
     if (response.constructor.name == InvalidModelStateResponse.name) {
        setLoading(false);
        loggerService.info((response as InvalidModelStateResponse).errors);
    }
  }
  return response;
  
  } catch (e) {
    throw e;
  }
};
