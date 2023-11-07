import React, { useState } from 'react';
import {
    SearchOutlined,
    MailOutlined,
    BellOutlined,
    LineOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Layout, Button, Row, Col, Avatar, Dropdown, } from 'antd';
import type { MenuProps } from 'antd';
import { InputText } from 'src/infrastructure/common/components/controls/input';
import { NextRouter, useRouter } from 'next/router';
import { BoldText } from '../components/controls/text';
import styles from 'assets/styles/common/layout/Header.module.css'
import Link from 'next/link';
import { AccountManagementService } from 'src/infrastructure/identity/account/service/AccountManagementService';
import Endpoint from 'src/core/application/common/Endpoint';
import {useRecoilValue } from 'recoil';
import { ProfileState } from 'src/core/application/common/atoms/identity/account/ProfileState';

const LogoutAsync = async (
    context: any,
    params: any,
    router: NextRouter,
    setIsLoading: Function,
) => {
    try {
        let response = await new AccountManagementService().logoutAsync(
            Endpoint.AccountManagement.logout,
            {},
            context
        );
        if (response.status == 200) {
            router.push('/account/sign-in.html');
        }

    }
    catch (error) {
        throw error;
    }

}






const Header = ({ context, translator, ...props }: any) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const router = useRouter();
    const [textSearch, setTextSearch] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const myProfileRef = useRecoilValue<any>(ProfileState);

    const signOut = async () => {
        await LogoutAsync(
            context,
            {},
            router,
            setIsLoading
        )
    }


    const onChange = (e: any) => {
        setTextSearch(e.target.value);
    }

    const onBlurSearch = () => {
        setTextSearch(textSearch.trim());
    }

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div>
                    <Link href="/account/profile.html">
                        <BoldText>Profile</BoldText>
                    </Link>
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <div>
                    <Link href="/account/change-password.html">
                        <BoldText>Change Password</BoldText>
                    </Link>
                </div>
            ),
        },
        {
            key: '3',
            label: (
                <div onClick={signOut}>
                    <BoldText>Sign Out</BoldText>
                </div>
            ),
        }
    ];

    const handleAvatar = () => {
        if(myProfileRef?.data?.avatar != null){
            return (
                <img src = {`${baseUrl}/FileStorage/${myProfileRef?.data?.avatar}`} className={styles.avatar} alt="Avatar" />
            );
        }
        else{
            return (
                <Avatar icon={<UserOutlined />} size={40} />
            );
        }
    }


    return (
        <Layout.Header className={styles.header_main_layout_background}>
            <Row>
                
                <Col span={8} className={styles.right_header_layout} >
                    <div className={styles.icon_right_header}>
                        <MailOutlined style={{ color: "#fff", fontSize: "18px" }} />
                    </div>
                    <div className={styles.icon_right_header}>
                        <BellOutlined style={{ color: "#fff", fontSize: "18px" }} />
                    </div>
                    <div className={styles.icon_right_header}>
                        <LineOutlined style={{ color: "#fff", fontSize: "18px" }} rotate={90} />
                    </div>
                    <Dropdown menu={{ items }} placement="bottomRight" trigger={['hover']} >
                        <div className={styles.icon_right_header}>
                            {handleAvatar()}
                        </div>
                    </Dropdown>
                </Col>
            </Row>
        </Layout.Header>
    );
};

export default Header;
