import './index.scss';

import React from "react";
import {FormattedMessage} from "react-intl";

import phoneCall from "assets/images/phone-call.svg";


const InDeliveryButton = ({ onClick }) => {
    return (
        <button className={'in-delivery-button'} onClick={onClick}>
            <span className={'in-delivery-button__text'}><FormattedMessage id={'words.common.in-delivery'}/></span>
        </button>
    )
}


export default InDeliveryButton;
