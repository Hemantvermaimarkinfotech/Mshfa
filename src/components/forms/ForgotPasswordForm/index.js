import './index.scss';

import React, { useState } from "react";
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import { AuthForm, TextField } from 'components/forms';
import { PrimaryButton, TextButton } from 'components/layout/buttons';
import ForgotPasswordFormScheme from './index.schema';
import { GlobalAuthRouter } from "routes";
import { useAuth } from "hooks/auth";
import {useIntl} from "react-intl";

const ForgotPasswordForm = ({ afterSuccessSubmit }) => {

    const { resetPassword } = useAuth();
    const intl = useIntl()

    const [formError, setFormError] = useState('');

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: ForgotPasswordFormScheme,
        onSubmit: (values) => {
            resetPassword(values.email)
                .then(response => {
                    const { success, errors } = response.data?.resetPassword;
                    if (success) {
                        afterSuccessSubmit();
                    } else {
                        setFormError(errors[0]);
                    }
                })
        }
    })

    return (
        <div className={'forgot-password-form'}>
            <AuthForm
                error={formError}
                title={intl.formatMessage({id: 'words.common.forgot-password'})}
                caption={'Enter your email for password recovery'}
                shouldShowDisclaimer={false}
            >
                <form className={'forgot-password-form__form'} onSubmit={formik.handleSubmit}>
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
                    <PrimaryButton text={'Send recovery link'} type="submit" />
                    <div className={'forgot-password-form__footer'}>
                        <Link className={'forgot-password-form__link forgot-password-form__link--back'} to={GlobalAuthRouter.paths.login}>
                            <TextButton text={'Back to Sign In'} />
                        </Link>
                        <div className={'forgot-password-form__resend'}>
                            <span className={'forgot-password-form__text'}>
                                Don't receive the link?
                            </span>
                            <TextButton text={'Resend'} type={'submit'} />
                        </div>
                    </div>
                </form>
            </AuthForm>
        </div>
    )
}

export default ForgotPasswordForm;
