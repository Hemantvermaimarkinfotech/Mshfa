import './index.scss';

import React from 'react';
import { useReactiveVar } from "@apollo/client";
import state from 'apollo/state';
import { FormattedMessage } from "react-intl";

const LangSwitcher = () => {
    const { lang } = useReactiveVar(state.userLang);
    const switchLang = () => {
        state.userLang({
            lang: lang === 'en' ? 'ar' : 'en',
        })
    }
    return <div dir={lang === 'en' ? 'rtl' : 'ltr'} className="lang-switcher" onClick={switchLang}>
        <FormattedMessage
            tagName="span"
            id="language.name"
        />
    </div>
}

export default LangSwitcher;