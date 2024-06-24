import './index.scss';

import React, { useState } from "react";
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import { AuthForm, TextField, PasswordField, CheckboxField } from 'components/forms';
import { PrimaryButton, TextButton } from 'components/layout/buttons';
import SignInFormScheme from './index.schema';
import { GlobalAuthRouter } from "routes";
import { useAuth } from "hooks/auth";
import {useIntl} from "react-intl";

const SignInForm = () => {

    const { login } = useAuth();
    const intl = useIntl()
    const [formError, setFormError] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            remember: false
        },
        validationSchema: SignInFormScheme,
        onSubmit: (values) => {
            login(values.email, values.password)
                .catch(error => {
                    setFormError(error.message);
                });
        }
    })


    return (
        <div className={'sign-in-form'}>
            <AuthForm
                error={formError}
                caption={'Sign in with your credentials below.'}
            >
                <form className={'sign-in-form__form'} onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        id="email"
                        name="email"
                        label={intl.formatMessage({id: 'words.common.email'})}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <PasswordField
                        fullWidth
                        id="password"
                        name="password"
                        label={intl.formatMessage({id: 'words.common.password'})}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <div className={'sign-in-form__checkbox-container'}>
                        <CheckboxField name={'remember'} value={formik.values.remember} onChange={formik.handleChange} title={'Keep me logged in'} />
                        <Link className={'sign-in-form__link'} to={GlobalAuthRouter.paths.forgotPassword}>
                            <TextButton text={intl.formatMessage({id: 'words.common.is-forgot-password'})} />
                        </Link>
                    </div>
                    <PrimaryButton text={intl.formatMessage({id: 'words.common.sign-in'})} type={'submit'} />
                </form>
            </AuthForm>
        </div>
    )
}

export default SignInForm;
