import React from "react";
import { Input, Row } from 'antd';

type Props = {
    placeholder: string;
    value: string;
    onChange: (e: any) => void;
    prefix?: any;
    size?: any;
    onBlur?: () => void;
    bordered?: boolean;
}


export const InputText = (props: Props) => {
    const { placeholder, value, onChange, prefix, size, onBlur,bordered } = props;

    return (
        <Input
            prefix={prefix}
            style={{ width: '100%', backgroundColor: '#F5F5F5' }}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            size={size}
            onBlur={onBlur}
            bordered={bordered}
        />
    )
};
