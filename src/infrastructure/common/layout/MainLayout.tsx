import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import LeftMenu from "src/infrastructure/common/layout/LeftMenu";
import Header from "src/infrastructure/common/layout/Header";
import Content from "src/infrastructure/common/layout/Content";
import styles from "assets/styles/common/layout/MainLayout.module.css";
import LocalStorageService from "src/infrastructure/services/LocalStorageService";
import Constant from "src/core/application/common/constants";
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

const DynamicComponentWithNoSSR = dynamic(() => import("./LeftMenu"), {
  ssr: false,
});

const getMyProfileAsync = async (
  cookie: Cookie,
  loggerService: LoggerService,
  setLoading: Function
) => {
  let response = await new AccountManagementService().getMyProfileAsync(
    Endpoint.AccountManagement.getMyProfile,
    {},
    cookie
  );
    console.log(response);
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

  else if(response.status == 401){
    setLoading(false);
    loggerService.info((response as InvalidModelStateResponse).errors);
    
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
    await getMyProfileAsync(context, loggerService, setIsLoading);
  };

  useEffect(() => {
    getMyProfile();
  }, []);


  if (isLoading) {
    return <FullPageLoading isLoading={isLoading} />;
  }

   if(!storage.isAuthenticated){
    return <FullPageLoading isLoading={true} />;
    }

  return (
    <Layout className={styles.qlhs_main_layout}>
      <LeftMenu context={context} translator={translator} isHiddenLeftMenu={isHiddenLeftMenu} setIsHiddenLeftMenu={setIsHiddenLeftMenu}  />
      <Layout className={styles.qlhs_main_content}>
        <Header context={context} translator={translator} isHidden={isHiddenLeftMenu} setIsHidden={setIsHiddenLeftMenu}  />
        <Content context={context} translator={translator}>
          {props.children}
        </Content>
        {/* <Footer context={context} translator={translator} /> */}
      </Layout>
    </Layout>
  );
};

export default MainLayout;
