import './index.scss';
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { PrimaryButton, NeutralButton } from "components/layout/buttons";

import { orderRejectReason } from "config/order";
import { FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { TextField } from "components/forms";

const OrderRejectPopup = ({onConfirm, onCancel}) => {

    const intl = useIntl();


    const [ actionReason, setActionReason ] = useState('');
    const [ actionReasonText, setActionReasonText ] = useState('');

    const onReasonChanged = (event, value) => {
        setActionReason(value);
        setActionReasonText('');
    }

    const handleConfirm = () => {
        onConfirm(actionReason ?
            actionReason.indexOf('other') !== -1 ? actionReasonText : intl.formatMessage({id:`admin.order.${actionReason}`})
            : ''
        )
    }

    const confirmIsEnabled = () => {
        return actionReason ?
            actionReason.indexOf('other') !== -1 ? !!actionReasonText : true
            : false
    }

    return <div className="reject-order-popup">
        <div className="reject-order-popup__content">
            <RadioGroup className="reject-order-popup__radio-group" value={actionReason} onChange={onReasonChanged}>
                {orderRejectReason.map(reason => (
                    <FormControlLabel
                        key={reason}
                        value={reason}
                        label={<FormattedMessage id={`admin.order.${reason}`}/>}
                        control={<Radio />}/>
                ))}
            </RadioGroup>
            <TextField
                disabled={actionReason.indexOf('other') === -1}
                value={actionReasonText}
                onChange={(e) => setActionReasonText(e.target.value)}
                placeholder="Description of the reason"
            />
        </div>
        <div className="reject-order-popup__buttons">
            <NeutralButton text="No" onClick={onCancel}/>
            <PrimaryButton text="Yes" disabled={!confirmIsEnabled()} onClick={() => handleConfirm()}/>
        </div>
    </div>;
}

export default OrderRejectPopup;