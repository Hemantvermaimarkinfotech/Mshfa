import './index.scss';
import React from "react";
import {FormattedMessage} from "react-intl";

import { testRequestStatus } from "config/test_request";


const UserActionsDropdown = ({ onComplete, onStart, onReject, status }) => {
    return (
        <div className={'lab-test-dropdown'}>
            <ul className={'lab-test-dropdown__list'}>
                {status === testRequestStatus.NEW && <li className={'lab-test-dropdown__item'} onClick={onStart}>
                    <span className={'lab-test-dropdown__text'}><FormattedMessage id={'words.statuses.in-progress'}/></span>
                </li>}
                {status === testRequestStatus.IN_PROGRESS && <li className={'lab-test-dropdown__item'} onClick={onComplete}>
                    <span className={'lab-test-dropdown__text'}>Complete</span>
                </li>}
                <li className={'lab-test-dropdown__item'} onClick={onReject}>
                    <span className={'lab-test-dropdown__text'}>Reject</span>
                </li>
            </ul>
        </div>
    );
}

export default UserActionsDropdown;
