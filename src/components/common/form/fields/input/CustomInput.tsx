import React from 'react';
import style from '../../CustomFields.module.scss';
import {Input} from 'antd';
import {InputProps} from 'antd/lib/input/Input';

export const CustomInput: React.FC<InputProps> = (props) => {
    return <Input
        {...props}
        className={`${style.field} ${style.field_input} ${props.className}`}
        autoComplete='off'
    />;
}