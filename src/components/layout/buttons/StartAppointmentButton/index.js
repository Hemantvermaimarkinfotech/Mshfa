import './index.scss';

import React from "react";

import phoneCall from "assets/images/phone-call.svg";
import {useIntl} from "react-intl";

const StartAppointmentButton = ({ onClick }) => {

    const intl = useIntl()

    return (
        <button className={'start-appointment-button'} onClick={onClick}>
            <img className={'start-appointment-button__icon'} src={phoneCall} alt={intl.formatMessage({id: 'words.common.start-appointment'})}/>
            <span className={'start-appointment-button__text'}>{intl.formatMessage({id: 'words.common.start-appointment'})}</span>
        </button>
    )
}


export default StartAppointmentButton;
