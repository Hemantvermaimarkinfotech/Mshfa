import './index.scss';

import React from "react";
import { useHistory } from 'react-router-dom';

import { Paper } from 'components/layout'
import { GlobalAuthRouter } from "routes";
import logoBlue from 'assets/images/logo_blue.svg';
import {LangSwitcher} from "../../common";
import {FormattedMessage} from "react-intl";

const DefaultDisclaimer = () => {

    const history = useHistory();

    const handleGoToTerms = () => {
        history.push(GlobalAuthRouter.paths.publicLegal + '?tab=terms');
    }

    const handleGoToPolicy = () => {
        history.push(GlobalAuthRouter.paths.publicLegal + '?tab=policy');
    }



    return (
        <p className={'auth-form__disclaimer'}>
            <FormattedMessage
                id={'words.login.disclaimer'}
                values={
                    {
                        terms: (
                            <span
                                className={'auth-form__disclaimer-link'}
                                onClick={handleGoToTerms}
                            >
                                <FormattedMessage id={'words.common.terms-of-use'}/>
                            </span>
                        ),
                        privacy: (
                            <span
                                className={'auth-form__disclaimer-link'}
                                onClick={handleGoToPolicy}
                            >
                               <FormattedMessage id={'words.common.privacy-policy'}/>
                            </span>
                        )
                    }
                }
            />
        </p>
    )
}


const AuthForm = ({ error, title, caption, children, disclaimer, shouldShowDisclaimer = true }) => {
    return (
        <Paper className={'auth-form'}>
            <img className={'auth-form__logo'} src={logoBlue} alt="logo"/>
            {title && <h3 className={'auth-form__title'}>{title}</h3>}
            <p className={'auth-form__caption'}>{caption}</p>
            {error && <p className={'auth-form__error'}>{error}</p>}
            <div className="auth-form__form">
                {children}
            </div>
            {
                shouldShowDisclaimer ?
                    disclaimer ? <p className={'auth-form__disclaimer'}>{disclaimer}</p> : <DefaultDisclaimer />
                    : null
            }
        </Paper>
    )
}

export default AuthForm;
