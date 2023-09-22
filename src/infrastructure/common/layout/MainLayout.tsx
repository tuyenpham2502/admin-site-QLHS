import React, { useEffect, useState } from "react";
import { Layout } from 'antd';
import LeftMenu from "src/infrastructure/common/layout/LeftMenu";
import Header from "src/infrastructure/common/layout/Header";
import Content from "src/infrastructure/common/layout/Content";
import styles from 'assets/styles/common/layout/MainLayout.module.css'
import LocalStorageService from "@/infrastructure/services/LocalStorageService";
import Constant from "@/core/application/common/Constants";
import { useRouter } from "next/router";
import { getMyProfileAsync } from "@/infrastructure/identity/account/effect/sigInWithEmail";
const MainLayout = ({ context, translator, ...props }: any) => {
    
    const router = useRouter();
    let localStorage = new LocalStorageService();
    let storage = localStorage.readStorage(Constant.API_TOKEN_STORAGE);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (!storage?.isAuthenticated) {
            router.push('/account/sign-in.html');
        }
    }, [storage]);

    const getMyProfile = async () => {
        await getMyProfileAsync(
            context,
            router,
            setIsLoading
        )
    }

    useEffect(() => {
        getMyProfile
    }, []);

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
