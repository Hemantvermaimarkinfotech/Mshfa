import './index.scss';

import React from "react";

import logoBlue from 'assets/images/logo_blue.svg';

const GlobalMessage = ({ message, logo }) => {
    return (
        <div className={'global-message'}>
            {logo && <img className={'global-message__logo'} src={logoBlue} alt="logo"/>}
            <h1 className={'global-message__text'}>{message}</h1>
        </div>
    )
}

export default GlobalMessage;