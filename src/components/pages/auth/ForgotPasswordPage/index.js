import './index.scss';

import React, { useState } from "react";

import { GlobalMessage } from 'components/layout';
import { ForgotPasswordForm } from 'components/forms';

const ForgotPasswordPage = () => {

    const [isSent, setSent] = useState(false);

    const handleSuccessSubmit = () => setSent(true);
    return (
        <div className={'auth-page forgot-password-page'}>
            {isSent ? <GlobalMessage logo message={'Recovery link was successfully sent. Please, check our letter on your email'} /> : <ForgotPasswordForm afterSuccessSubmit={handleSuccessSubmit} />}
        </div>
    )
}

export default ForgotPasswordPage;