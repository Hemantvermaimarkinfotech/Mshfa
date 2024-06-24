import './index.scss';

import React, { useEffect, useState } from "react";

import { GlobalLoader, GlobalMessage } from 'components/layout';
import { useAuth } from "hooks/auth";

import emailConfirmed from 'assets/images/email-confirmed.svg';

const EmailConfirmationPage = () => {

    const { confirmEmail } = useAuth();

    const [isLoading, setLoading] = useState(false);
    const [isTokenValid, setTokenValid] = useState(false);
    const [link, setLink] = useState(null);

    useEffect(() => {

        const searchParams = new URLSearchParams(window.location.search);

        const uid = searchParams.get('uidb64');
        const token = searchParams.get('token');
        const link = searchParams.get('dynamic_link');

        if (uid && token) {
            confirmEmail(uid, token)
                .then(response => {
                    const { success } = response.data?.emailConfirm;
                    if (success) {
                        // get the link from response and pass to button 'go to app'
                        setLink(link);
                        setTokenValid(true);
                        setLoading(false);
                    } else {
                        setTokenValid(false)
                        setLoading(false);
                    }
                })
                .catch(() => {
                    setTokenValid(false)
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }

    }, [])

    const renderSuccessConfirmMessage = () => {
        return (
            <>
                <img className={'email-confirmation-page__image'} src={emailConfirmed} alt="icon"/>
                <h3 className={'email-confirmation-page__title'}>Email Confirmed!</h3>
                <a href={link}>
                    <button className={'email-confirmation-page__button'}>Go to Mshfa app</button>
                </a>
            </>
        )
    }

    return (
        <div className={'auth-page email-confirmation-page'}>
            {
                isLoading ? <GlobalLoader /> :
                    isTokenValid ? renderSuccessConfirmMessage() :
                        <GlobalMessage logo message={'Sorry, your link is invalid or expired. Please, request a new one'} />
            }
        </div>
    )
}

export default EmailConfirmationPage;