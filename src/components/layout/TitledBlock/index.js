import './index.scss';

import React from "react";
import {FormattedMessage} from "react-intl";

const TitledBlock = ({ title, children, localeId, actionsBar = null }) => {
    return (
        <div className={'titled-block'}>
            <div className={'titled-block__header'}>
                <span className={'titled-block__title'}>{title ? title : localeId ? <FormattedMessage id={localeId}/> : ''}</span>
                {actionsBar}
            </div>
            <div className={'titled-block__content'}>{children}</div>
        </div>
    )
}

export default TitledBlock;
