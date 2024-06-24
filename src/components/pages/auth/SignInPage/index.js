import './index.scss';

import React from "react";

import { SignInForm } from 'components/forms';

const SignInPage = () => {
    return (
        <div className={'auth-page sign-in-page'}>
            <SignInForm />
        </div>
    )
}

export default SignInPage;