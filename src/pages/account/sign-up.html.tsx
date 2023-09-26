//login page

import React, { useState } from 'react';
import { Input, Button } from 'antd';


const SignUpPage = () => {

    const [user, setUser] = useState({
        userName: '',
        password: ''
    });

    const oncChangeUserName = (e: any) => {
        setUser({
            ...user,
            userName: e.target.value,
        })
    }

    const onChangePassword = (e: any) => {
        setUser({
            ...user,
            password: e.target.value,
        })
    }



    return (
        <div>
            <Input placeholder="User name"
                onChange={oncChangeUserName}
            />
            <Input placeholder="Password"
                onChange={onChangePassword}
            />
            <Button type="primary" >Login</Button>
        </div>
    )

};

export default SignUpPage;



