//login page

import React, { useState } from 'react';
import styles from 'styles/pages/account/forgot-password.module.css'
import { Input, Button, Row, Col } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { NextSeo } from 'next-seo';
import { validateEmail } from 'src/infrastructure/helpers/validate';
import { MessageError } from 'src/infrastructure/common/components/controls/message-error';
import { validateInputPassword } from 'src/infrastructure/helpers/validate';
import { useSearchParams } from 'next/navigation';

const ForgotPasswordPage = () => {
    const { t } = useTranslation('common');
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [errorEmail, setErrorEmail] = useState({
        isError: false,
        message: ''
    });
    const searchParams = useSearchParams();
    const search = searchParams.get('search');

    

    const oncChangeUserName = (e: any) => {
        setUser({
            ...user,
            email: e.target.value,
        })
    }

   

    const isValidateData = () => {
        onBlurEmail();
        let checkEmail = validateEmail(user.email);
        if (checkEmail) {
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

    

    

    return (
        <>
            <NextSeo title={'Forgot password'} />
            <Row className={styles.content_sign_in}>
                <Col span={12}>
                </Col>
                <Col span={12} className={styles.right_content} >
                    <div className={styles.sign_in_wrapper}>
                        <div className={styles.form_sign_in}>
                            <Row className={styles.sign_in_input}>
                                <Input placeholder="Enter your account" onChange={oncChangeUserName} onBlur={onBlurEmail}  />
                                <MessageError isError={errorEmail.isError} message={errorEmail.message} />
                            </Row>
                            <Row >
                                <Button className={styles.button_sign_in} type="primary">SEND</Button>
                            </Row>
                        </div>

                    </div>
                </Col>
            </Row>
        </>
    )

};

export default ForgotPasswordPage;



