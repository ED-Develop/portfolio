import React from 'react';
import {Field, WrappedFieldProps} from 'redux-form';
import {Form} from 'antd';
import {ValidatorsType} from '../../../../utils/validators';
import {WrappedFieldMetaProps} from 'redux-form/lib/Field';
import {CustomCheckbox} from '../fields/chekbox/CustomChekbox';
import {CustomInput} from '../fields/input/CustomInput';

export type TFieldType = 'text' | 'password' | 'checkbox' | 'textarea'

export type FieldPropsType = {
    name: string
    label?: string
    validate?: Array<ValidatorsType>
    type?: TFieldType
    placeholder?: string
}

const reduxFormField = (Component: React.ComponentType<any>): React.FC<FieldPropsType> => {
    const isError = (meta: WrappedFieldMetaProps) => meta.touched && meta.error ? 'error' : 'success';

    const FieldComponent: React.FC<WrappedFieldProps & FieldPropsType> = ({meta, input, label, ...props}) => (
        <Form.Item
            label={label}
            validateStatus={isError(meta)}
            help={meta.touched && meta.error}
        >
            <Component {...input} {...props}/>
        </Form.Item>
    );

    return ({name, validate, ...props}) => {
        return (
            <Field
                name={name}
                validate={validate}
                component={FieldComponent}
                {...props}
            />
        )
    }
};

export const ReduxFormInput = reduxFormField(CustomInput);
export const ReduxFormCheckbox = reduxFormField(CustomCheckbox);