import './index.scss';

import React from "react";
import {FormattedMessage} from "react-intl";

const TitledText = ({ title, children, localeId }) => {
    return (
        <div className={'titled-text'}>
            <span className={'titled-text__title'}>{title ? title : localeId ? <FormattedMessage id={localeId}/> : ''}</span>
            <span className={'titled-text__text'}>{children}</span>
        </div>
    )
}

export default TitledText;
