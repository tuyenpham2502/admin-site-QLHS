//login page

import React, { useEffect, useState } from 'react';
import styles from 'assets/styles/pages/account/sign-in.module.css'
import { Input, Button, Row, Col } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { NextSeo } from 'next-seo';
import { validateEmail } from 'src/infrastructure/helpers/validate';
import { MessageError } from 'src/infrastructure/common/components/controls/message-error';
import { validateInputPassword } from 'src/infrastructure/helpers/validate';
import { getMyProfileAsync, signInWithEmailAsync } from 'src/infrastructure/identity/account/effect/sigInWithEmail';
import LocalStorageService from 'src/infrastructure/services/LocalStorageService';
import Constant from 'src/core/application/common/Constants';

const SignInPage = (context) => {
    const { t } = useTranslation('common');
    const router = useRouter();
    let localStorage = new LocalStorageService();
    let storage = localStorage.readStorage(Constant.API_TOKEN_STORAGE);

    useEffect(() => {
        if(storage?.token){
            router.push('/');
        }
    }, [storage]);
    
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [errorEmail, setErrorEmail] = useState({
        isError: false,
        message: ''
    });

    const [errorPassword, setErrorPassword] = useState({
        isError: false,
        message: ''
    });

    const [isLoading, setIsLoading] = useState(false);

    const oncChangeUserName = (e: any) => {
        setUser({
            ...user,
            email: e.target.value,
        })
    }

    const onChangePassword = (e: any) => {
        setUser({
            ...user,
            password: e.target.value,
        })
    }

    const isValidateData = () => {
        onBlurEmail();
        onBlurPassword();
        let checkEmail = validateEmail(user.email);
        let checkPassword = validateInputPassword(user.password);
        if (checkEmail && checkPassword) {
            return true;
        }
        return false;
    }

    const validateFields = (isCheck: boolean, setError: { (value: React.SetStateAction<{ isError: boolean; message: string; }>): void; (arg0: any): void; }, error: { isError: boolean; message: string; }, message: string) => {
        setError({
            ...error,
            isError: isCheck,
            message: message,
        });
    };

    const onBlurEmail = () => {
        let checkEmail = validateEmail(user.email);
        validateFields(!checkEmail, setErrorEmail, errorEmail, !checkEmail ? user.email ? "Email không hợp lệ" : "Vui lòng nhập Email" : "");
    }

    const onBlurPassword = () => {
        let checkPassword = validateInputPassword(user.password);
        validateFields(!checkPassword, setErrorPassword, errorPassword, !checkPassword ? user.password ? "Mật khẩu không hợp lệ" : "Vui lòng nhập mật khẩu" : "");
    }

    const handleSubmit = async (event: any) => {
        if (isValidateData()) {
            let res = await signInWithEmailAsync(user.email, user.password, context);
            if(res && res.status == 200) {
                await getMyProfileAsync(context, router, setIsLoading);
            }
        }
    }

    return (
        <>
            <NextSeo title={'Sign In'} />
            <Row className={styles.content_sign_in}>
                <Col span={12}>
                </Col>
                <Col span={12} className={styles.right_content} >
                    <div className={styles.sign_in_wrapper}>
                        <div className={styles.form_sign_in}>
                            <Row className={styles.sign_in_input}>
                                <Input placeholder="Enter your account" onChange={oncChangeUserName} onBlur={onBlurEmail} onPressEnter={handleSubmit} />
                                <MessageError isError={errorEmail.isError} message={errorEmail.message} />
                            </Row>
                            <Row className={styles.sign_in_input}>
                                <Input.Password placeholder="Enter your password" onChange={onChangePassword} onBlur={onBlurPassword} onPressEnter={handleSubmit} />
                                <MessageError isError={errorPassword.isError} message={errorPassword.message} />
                            </Row>
                            <Row >
                                <Link style={{
                                    textDecoration: 'underline',
                                    color: '#14238A',
                                }} href="/account/forgot-password.html">Forgot your password?</Link>
                            </Row>
                            <Row >
                                <Button className={styles.button_sign_in} type="primary" onClick={handleSubmit}>SIGN IN</Button>
                            </Row>
                        </div>

                    </div>
                </Col>
            </Row>
        </>
    )

};

export default SignInPage;



