import './index.scss';

import React from 'react';

import { Logo } from 'components/common';

const GlobalError = () => {
    return (
        <div className={'global-error'}>
            <div className={'global-error__message-container'}>
                <Logo />
                <p className={'global-error__message'}>Something went wrong, please try again</p>
            </div>
        </div>
    )
}

export default GlobalError;