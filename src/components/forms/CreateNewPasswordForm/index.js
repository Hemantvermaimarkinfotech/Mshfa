import './index.scss';

import React, { useState } from "react";
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import { AuthForm, PasswordField } from 'components/forms';
import { PrimaryButton, TextButton } from 'components/layout/buttons';
import CreateNewPasswordFormScheme from './index.schema';
import { GlobalAuthRouter } from "routes";
import { useAuth } from "hooks/auth";
import { useErrorMessage } from "hooks/formErrorMessage";
import {useIntl} from "react-intl";

const CreateNewPasswordForm = ({ uid, token, onAfterSuccessSubmit }) => {

    const [formError, setFormError] = useState('');

    const { createNewPassword } = useAuth();
    const intl = useIntl();

    const formik = useFormik({
        initialValues: {
            password: '',
            uid: uid,
            token: token
        },
        validationSchema: CreateNewPasswordFormScheme,
        onSubmit: (values) => {
            createNewPassword(values.password, values.uid, values.token)
                .then(response => {
                    const { success } = response.data?.resetPasswordConfirm;
                    if (success) {
                        onAfterSuccessSubmit();
                    }
                })
                .catch(error => {
                    setFormError(error.message)
                });
        }
    })

    useErrorMessage([], formik);

    return (
        <div className={'create-new-password-form'}>
            <AuthForm
                error={formError}
                title={intl.formatMessage({id: 'words.common.create-password'})}
                caption={intl.formatMessage({id: 'words.common.password-contains'})}
                shouldShowDisclaimer={false}
            >
                <form className={'create-new-password-form__form'} onSubmit={formik.handleSubmit}>
                    <PasswordField
                        fullWidth
                        id="password"
                        name="password"
                        label={intl.formatMessage({id: 'words.common.new-password'})}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                    />
                    <PrimaryButton text={intl.formatMessage({id: 'words.common.continue'})} type={'submit'} />
                    <div className={'create-new-password-form__footer'}>
                        <Link className={'forgot-password-form__link'} to={GlobalAuthRouter.paths.login}>
                            <TextButton text={'Back to Sign in'} />
                        </Link>
                    </div>
                </form>
            </AuthForm>
        </div>
    )
}

export default CreateNewPasswordForm;
