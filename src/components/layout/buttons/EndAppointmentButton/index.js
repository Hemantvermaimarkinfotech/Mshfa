import './index.scss';

import React from "react";

import endCall from "assets/images/end-call.svg";
import {FormattedMessage} from "react-intl";

const EndAppointmentButton = ({ onClick }) => {
    return (
        <button className={'end-appointment-button'} onClick={onClick}>
            <img className={'end-appointment-button__icon'} src={endCall} alt="end appointment"/>
            <span className={'end-appointment-button__text'}><FormattedMessage id={'words.common.end-call'}/></span>
        </button>
    )
}


export default EndAppointmentButton;
