//login page

import React, { useEffect, useState } from "react";
import styles from "assets/styles/pages/account/sign-in.module.css";
import {FacebookFilled} from "@ant-design/icons";
import loginBackground from "assets/images/login_background.jpg";
import logo from "assets/images/logo.png";
import { Input, Button, Row, Col, Checkbox } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { NextSeo } from "next-seo";
import { validateEmail } from "src/infrastructure/helpers/validate";
import { MessageError } from "src/infrastructure/common/components/controls/message-error";
import { validateInputPassword } from "src/infrastructure/helpers/validate";
import {
  getMyProfileAsync,
  signInWithEmailAsync,
} from "src/infrastructure/identity/account/effect/sigInWithEmail";
import LocalStorageService from "src/infrastructure/services/LocalStorageService";
import Constant from "src/core/application/common/constants";
import LoggerService from "src/infrastructure/services/LoggerService";
import { FullPageLoading } from "src/infrastructure/common/components/controls/loading";

const SignInPage = (context) => {
  const { t } = useTranslation("common");
  const loggerService = new LoggerService();
  const router = useRouter();
  let localStorage = new LocalStorageService();
  let storage = localStorage.readStorage(Constant.API_TOKEN_STORAGE);

  useEffect(() => {
    if (storage?.token) {
      router.push("/");
    }
  }, [storage]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errorEmail, setErrorEmail] = useState({
    isError: false,
    message: "",
  });

  const [errorPassword, setErrorPassword] = useState({
    isError: false,
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const oncChangeUserName = (e: any) => {
    setUser({
      ...user,
      email: e.target.value,
    });
  };

  const onChangePassword = (e: any) => {
    setUser({
      ...user,
      password: e.target.value,
    });
  };

  const isValidateData = () => {
    onBlurEmail();
    onBlurPassword();
    let checkEmail = validateEmail(user.email);
    let checkPassword = validateInputPassword(user.password);
    if (checkEmail && checkPassword) {
      return true;
    }
    return false;
  };

  const validateFields = (
    isCheck: boolean,
    setError: {
      (
        value: React.SetStateAction<{ isError: boolean; message: string }>
      ): void;
      (arg0: any): void;
    },
    error: { isError: boolean; message: string },
    message: string
  ) => {
    setError({
      ...error,
      isError: isCheck,
      message: message,
    });
  };

  const onBlurEmail = () => {
    let checkEmail = validateEmail(user.email);
    validateFields(
      !checkEmail,
      setErrorEmail,
      errorEmail,
      !checkEmail
        ? user.email
          ? "Email không hợp lệ"
          : "Vui lòng nhập Email"
        : ""
    );
  };

  const onBlurPassword = () => {
    let checkPassword = validateInputPassword(user.password);
    validateFields(
      !checkPassword,
      setErrorPassword,
      errorPassword,
      !checkPassword
        ? user.password
          ? "Mật khẩu không hợp lệ"
          : "Vui lòng nhập mật khẩu"
        : ""
    );
  };

  const handleSubmit = async (event: any) => {
    if (isValidateData()) {
      let res = await signInWithEmailAsync(t, user.email, user.password, context, setIsLoading);
      if (res && res.status == 200) {
        await getMyProfileAsync(t, context, router,loggerService, setIsLoading);
      }
    }
  };

  return (
    <>
      <NextSeo title={"Sign In"} />
      <Row className={styles.content_sign_in}>
        <div className={styles.sign_in_wrapper}>
          <Row className={styles.logo_wrapper}>
            <Image src={logo} className={styles.logo} height={40}  alt={"logo"} />
            <div className="wed-name-sign-in">My film</div>
          </Row>
          <Row className={styles.input_wrapper}>
            <Input
              placeholder="Email"
              onChange={oncChangeUserName}
              onBlur={onBlurEmail}
              onPressEnter={handleSubmit}
              style={{ height: 50, borderRadius: 16 }}
            />
            <MessageError
              isError={errorEmail.isError}
              message={errorEmail.message}
            />
          </Row>
          <Row className={styles.input_wrapper}>
            <Input.Password
              placeholder="Password"
              onChange={onChangePassword}
              onBlur={onBlurPassword}
              onPressEnter={handleSubmit}
              style={{ height: 50, borderRadius: 16 }}
            />
            <MessageError
              isError={errorPassword.isError}
              message={errorPassword.message}
            />
          </Row>
          <Row className={styles.button_sign_in_wrapper}>
            <Button
              className={styles.button_sign_in}
              type="primary"
              onClick={handleSubmit}
            >
              SIGN IN
            </Button>
          </Row>
        </div>
      </Row>
      <FullPageLoading isLoading={isLoading} />
    </>
  );
};

export default SignInPage;
