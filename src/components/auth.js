import React from 'react';
import {renderRoutes} from "react-router-config";
import {IntlProvider} from "react-intl";
import state from 'apollo/state';
import {createTheme as CreateMUITheme, ThemeProvider} from '@material-ui/core/styles';
import {useReactiveVar} from "@apollo/client";

import AR from 'lang/ar.json';
import EN from 'lang/en.json';

const createTheme = (lang) => {
    const direction = lang === 'en' ? 'ltr' : 'rtl';
    document.body.dir = direction;
    return CreateMUITheme({
        direction,
    });
};


const Auth = ({route}) => {

    const {lang} = useReactiveVar(state.userLang);
    const theme = createTheme(lang);

    return (
        <IntlProvider locale={lang} messages={lang === 'en' ? EN : AR}>
            <ThemeProvider theme={theme}>
                <div className="auth">
                    {renderRoutes([...route.routes.auth, ...route.routes.common])}
                </div>
            </ThemeProvider>
        </IntlProvider>
    );
}

export default Auth;
