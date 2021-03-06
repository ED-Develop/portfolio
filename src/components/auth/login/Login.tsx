import React, {FC} from 'react';
import style from '../Auth.module.scss';
import {useDispatch} from 'react-redux';
import {LoginFormData} from '../../../types/types';
import {Landing} from '../landing/Landing';
import {TField} from '../../common/form/fieldsManager';
import {email, required} from '../../../utils/validators';
import {AuthForm} from '../form/AuthForm';
import {ReduxFormInput} from '../../common/form/redux-form-fields/ReduxFormFields';
import {useSelector} from '../../../hook/useSelector';
import {login} from '../../../redux/auth/auth-reducer';
import {url} from '../../../utils/routeManager';

const Login: FC = () => {
    const dispatch = useDispatch();
    const captchaURL = useSelector(state => state.auth.captchaURL);

    const formData: Array<TField<LoginFormData>> = [
        {name: 'email', type: 'text', placeholder: 'Your email', validate: [email, required]},
        {name: 'password', placeholder: 'Your password', type: 'password', validate: [required]},
        {name: 'rememberMe', type: 'checkbox', label: ' Remember me'}
    ];

    const initialValues: LoginFormData = {
        email: process.env.REACT_APP_EMAIL || '',
        password: process.env.REACT_APP_PASSWORD || '',
        rememberMe: false
    }

    const handleSubmit = (value: LoginFormData) => dispatch(login(value));

    return (
        <Landing>
            <h3>Sign In</h3>
            <p>
                Don't have an account.
                <a href={url('sign-up')} target='_blank'> Sign Up</a>
            </p>
            <AuthForm
                handleSubmit={handleSubmit}
                initialValues={initialValues}
                formModel={formData}
                formName='login'
                btnText='Get Started'
            >
                {
                    captchaURL && (
                        <div className={style.landing__captcha}>
                            <p>Please complete our anti bot captcha: </p>
                            <img src={captchaURL} alt="captcha"/>
                            <ReduxFormInput
                                name='captcha'
                                type='text'
                                placeholder='Symbols from image'
                                validate={[required]}
                            />
                        </div>
                    )
                }
            </AuthForm>
            <a className={style.forgetLink} target='_blank' href={url('reset-password')}>
                Forget your password
            </a>
        </Landing>
    )
};

export default Login;
