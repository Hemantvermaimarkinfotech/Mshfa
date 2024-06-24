import './index.scss';

import React from "react";

import commonConfig from "config/common.config";
import {getTranslatedStatusId} from "../../../utils/text";
import {FormattedMessage} from "react-intl";

const StatusBar = ({ type, status }) => {
    const statuses = commonConfig.statuses;

    const resolveModifier = (status, type) => {
        const roleStatuses = statuses[type];
        return Object.keys(roleStatuses)
            .find(key => roleStatuses[key].includes(status))
    }

    return (
        <div className={`status-bar status-bar--${resolveModifier(status, type)}`}>
            <div className="status-bar__indicator" />
            <span className="status-bar__text"><FormattedMessage id={getTranslatedStatusId(status)}/></span>
        </div>
    )
}

export default StatusBar
