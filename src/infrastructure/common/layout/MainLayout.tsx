import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import LeftMenu from "src/infrastructure/common/layout/LeftMenu";
import Header from "src/infrastructure/common/layout/Header";
import Content from "src/infrastructure/common/layout/Content";
import styles from "assets/styles/common/layout/MainLayout.module.css";
import LocalStorageService from "src/infrastructure/services/LocalStorageService";
import Constant from "src/core/application/common/Constants";
import { NextRouter, useRouter } from "next/router";
import { FullPageLoading } from "../components/controls/loading";
import Cookie from "src/core/application/common/models/Cookie";
import Endpoint from "src/core/application/common/Endpoint";
import { AccountManagementService } from "src/infrastructure/identity/account/service/AccountManagementService";
import {
  ProfileState,
  RolesState,
  UserIdState,
} from "src/core/application/common/atoms/identity/account/ProfileState";
import SuccessResponse from "src/core/application/dto/common/responses/SuccessResponse";
import { setRecoilStateAsync } from "../libs/recoil-outside/Service";
import dynamic from "next/dynamic";
import LoggerService from "src/infrastructure/services/LoggerService";
import InvalidModelStateResponse from "src/core/application/dto/common/responses/InvalidModelStateResponse";
import { notifyError } from "../components/controls/toast/toast-message";
import { filterError } from "src/infrastructure/helpers";
import FailureResponse from "src/core/application/dto/common/responses/FailureResponse";

const DynamicComponentWithNoSSR = dynamic(() => import("./LeftMenu"), {
  ssr: false,
});

const getMyProfileAsync = async (
  translator: any,
  cookie: Cookie,
  loggerService: LoggerService,
  setLoading: Function
) => {
  let response = await new AccountManagementService().getMyProfileAsync(
    Endpoint.AccountManagement.getMyProfile,
    {},
    cookie
  );
  if (response.status == 200) {
    setRecoilStateAsync(ProfileState, {
      data: (response as SuccessResponse)?.data,
    });
    setRecoilStateAsync(UserIdState, {
      data: (response as SuccessResponse)?.data.id,
    });

    setRecoilStateAsync(RolesState, {
      data: (response as SuccessResponse)?.data.roles,
    });

    setTimeout(() => {
      setLoading(false);
    }, 0);
  }

  if (response.status == 202) {
    let errors = (response as FailureResponse).errors;
    if (errors != null && errors.length > 0) {
      notifyError(translator, filterError(errors));
      setLoading(false);
    }
  }

  if (response.constructor.name == InvalidModelStateResponse.name) {
    setLoading(false);
    loggerService.info((response as InvalidModelStateResponse).errors);
  }
  return response;
};

const MainLayout = ({ context, translator, ...props }: any) => {
  const [isHiddenLeftMenu, setIsHiddenLeftMenu] = useState(false);
  const router = useRouter();
  let localStorage = new LocalStorageService();
  let storage = localStorage.readStorage(Constant.API_TOKEN_STORAGE);
  const loggerService = new LoggerService();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!storage.isAuthenticated) {
      router.push("/account/sign-in.html");
    }
  }, [storage.isAuthenticated]);

  const getMyProfile = async () => {
    await getMyProfileAsync(translator, context, loggerService, setIsLoading);
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  if (isLoading) {
    return <FullPageLoading isLoading={isLoading} />;
  }

  if (!storage.isAuthenticated) {
    return <FullPageLoading isLoading={true} />;
  }

  return (
    <Layout className={styles.qlhs_main_layout}>
      <LeftMenu
        context={context}
        translator={translator}
        isHiddenLeftMenu={isHiddenLeftMenu}
        setIsHiddenLeftMenu={setIsHiddenLeftMenu}
      />
      <Layout className={styles.qlhs_main_content}>
        <Header
          context={context}
          translator={translator}
          isHidden={isHiddenLeftMenu}
          setIsHidden={setIsHiddenLeftMenu}
        />
        <Content context={context} translator={translator}>
          {props.children}
        </Content>
        {/* <Footer context={context} translator={translator} /> */}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
