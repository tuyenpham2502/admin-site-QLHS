import Endpoint from "src/core/application/common/Endpoint";
import { AccountManagementService } from "./../service/AccountManagementService";
import { SignInWithEmailRequest } from "@/core/application/dto/identity/account/request/signInWithEmail";
import Cookie from "@/core/application/common/models/Cookie";
import { NextRouter } from "next/router";
import LoggerService from "@/infrastructure/services/LoggerService";
import LocalStorageService from "@/infrastructure/services/LocalStorageService";
import SuccessResponse from "@/core/application/dto/common/responses/SuccessResponse";
import { Roles } from "@/core/domain/enums/Roles";
import { setRecoilStateAsync } from "@/infrastructure/common/libs/recoil-outside/Service";
import Constant from "@/core/application/common/Constants";
import {
  ProfileState,
  RolesState,
  UserIdState,
} from "@/core/application/common/atoms/identity/account/ProfileState";

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
  cookie: Cookie,
  router: NextRouter,
  // loggerService: LoggerService,
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
      if (arrRoles[0].toUpperCase() == Roles.User) {
        localStorageService.setStorage(
          Constant.API_TOKEN_STORAGE,
          new Cookie(false, "", "")
        );
        setRecoilStateAsync(ProfileState, {
          data: {},
        });
      } else {
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
      }
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  } catch (e) {
    throw e;
  }
};
