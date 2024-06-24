import './index.scss';

import React, { useEffect, useState } from "react";

import { GlobalLoader, GlobalMessage } from 'components/layout';
import { CreateNewPasswordForm } from 'components/forms';
import { useAuth } from "hooks/auth";

import { GlobalAuthRouter } from "routes";

const CreateNewPasswordPage = () => {

    const { verifyResetPasswordLink } = useAuth();

    const [isLoading, setLoading] = useState(true);
    const [isTokenValid, setTokenValid] = useState(false);

    const [uid, setUid] = useState(null);
    const [token, setToken] = useState(null);

    const [isCreated, setCreated] = useState(false);

    useEffect(() => {

        const searchParams = new URLSearchParams(window.location.search);

        const uid = searchParams.get('uid64');
        const token = searchParams.get('token');
        if (uid && token) {
            setUid(uid);
            setToken(token);
            verifyResetPasswordLink(uid, token)
                .then(response => {
                    const { success } = response.data?.checkEmailTokenLink;
                    if (success) {
                        setTokenValid(true);
                        setLoading(false);
                    } else {
                        setTokenValid(false)
                        setLoading(false);
                    }
                })
                .catch(error => {
                    setTokenValid(false)
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }

    }, [])

    const handleAfterSuccessCreatePasswordSubmit = () => {
        setCreated(true);
        setTimeout(() => {
            window.location = window.location.origin + GlobalAuthRouter.paths.login;
        }, 5000)
    }

    return (
        <div className={'auth-page create-new-password-page'}>
            {
                isCreated ?
                    <GlobalMessage logo message={'Your password was successfully created. Redirect to login page in 5 seconds'} /> :
                        isLoading ? <GlobalLoader /> :
                            isTokenValid ? <CreateNewPasswordForm uid={uid} token={token} onAfterSuccessSubmit={handleAfterSuccessCreatePasswordSubmit}/> :
                                <GlobalMessage logo message={'Sorry, your link is invalid or expired. Please, request a new one'} />
            }
        </div>
    )
}

export default CreateNewPasswordPage;