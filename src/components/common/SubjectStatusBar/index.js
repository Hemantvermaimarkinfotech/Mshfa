import './index.scss';

import React from "react";

import commonConfig from 'config/common.config';

const SubjectStatusBar = ({ status }) => {

    const statuses = commonConfig.subjectStatuses;

    const resolveModifier = (status) => {
        return Object.keys(statuses)
            .find(key => statuses[key].includes(status))
    }

    return (
        <div className={`subject-status-bar subject-status-bar--${resolveModifier(status)}`}>
            <div className="subject-status-bar__indicator" />
            <span className="subject-status-bar__text">{status}</span>
        </div>
    )
}

export default SubjectStatusBar