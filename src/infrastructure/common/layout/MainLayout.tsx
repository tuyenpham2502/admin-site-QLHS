import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
import LeftMenu from "src/infrastructure/common/layout/LeftMenu";
import Header from "src/infrastructure/common/layout/Header";
import Content from "src/infrastructure/common/layout/Content";
import styles from 'assets/styles/common/layout/MainLayout.module.css'
import LocalStorageService from "src/infrastructure/services/LocalStorageService";
import Constant from "src/core/application/common/constants";
import { NextRouter, useRouter } from "next/router";
import { FullPageLoading } from "../components/controls/loading";
import Cookie from "src/core/application/common/models/Cookie";
import Endpoint from "src/core/application/common/Endpoint";
import { AccountManagementService } from "src/infrastructure/identity/account/service/AccountManagementService";
import { ProfileState, RolesState, UserIdState } from "src/core/application/common/atoms/identity/account/ProfileState";
import SuccessResponse from "src/core/application/dto/common/responses/SuccessResponse";
import { setRecoilStateAsync } from "../libs/recoil-outside/Service";
import dynamic from "next/dynamic";

const DynamicComponentWithNoSSR = dynamic(
    () => import('./LeftMenu'),
    { ssr: false }
)
const getMyProfileAsync = async (

    cookie: Cookie,
    // loggerService: LoggerService,
    setLoading: Function
) => {
    setLoading(true);
    let response = await new AccountManagementService().getMyProfileAsync(
        Endpoint.AccountManagement.getMyProfile,
        {},
        cookie
    );
    if (response.status == 200) {
        setRecoilStateAsync(ProfileState, {
            data: (response as SuccessResponse)?.data.getMyProfile.user,
        });
        setRecoilStateAsync(UserIdState, {
            data: (response as SuccessResponse)?.data.getMyProfile.user.userId,
        });

        setRecoilStateAsync(RolesState, {
            data: (response as SuccessResponse)?.data.getMyProfile.user.role,
        });

        setTimeout(() => {
            setLoading(false);
        }, 0);

    };
    return response;
}


const MainLayout = ({ context, translator, ...props }: any) => {

    const router = useRouter();
    let localStorage = new LocalStorageService();
    let storage = localStorage.readStorage(Constant.API_TOKEN_STORAGE);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (!storage?.isAuthenticated) {
            router.push('/account/sign-in.html');
        }
    }, [router, storage]);



    const getMyProfile = async () => {
        await getMyProfileAsync(
            context,
            setIsLoading
        )
    }

    useEffect(() => {
        getMyProfile();
    }, []);

    if (isLoading) {
        return (
            <FullPageLoading isLoading={isLoading} />
        )
    }

    return (
        <Layout className={styles.qlhs_main_layout}>
            <LeftMenu context={context} translator={translator} />
            <Layout className={styles.qlhs_main_content}>
                <Header context={context} translator={translator} />
                <Content context={context} translator={translator}>
                    {props.children}
                </Content>
                {/* <Footer context={context} translator={translator} /> */}
            </Layout>
        </Layout>
    )
};

export default MainLayout;
