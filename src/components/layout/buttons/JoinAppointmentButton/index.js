import './index.scss';

import React from "react";

import phoneCall from "assets/images/phone-call.svg";

const JoinAppointmentButton = ({ onClick }) => {
    return (
        <button className={'join-appointment-button'} onClick={onClick}>
            <img className={'join-appointment-button__icon'} src={phoneCall} alt="join appointment"/>
            <span className={'join-appointment-button__text'}>Join appointment</span>
        </button>
    )
}


export default JoinAppointmentButton;