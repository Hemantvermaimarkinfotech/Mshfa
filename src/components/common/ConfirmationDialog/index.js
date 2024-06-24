import './index.scss';
import React from "react";

import { NeutralButton, PrimaryButton } from "components/layout/buttons";
import attention from "assets/images/attention-icon.svg";

const ConfirmationDialog = ({text, onConfirm, onCancel}) => {
    return <div className="confirmation-modal">
        <div className="confirmation-modal__description">
            <img
                className={'confirmation-modal__description__icon'}
                src={attention}
                alt="attention"
            />
            {text}
        </div>
        <div className="confirmation-modal__buttons">
            <NeutralButton text="No" onClick={onCancel}/>
            <PrimaryButton text="Yes" onClick={onConfirm}/>
        </div>
    </div>;
}
export default ConfirmationDialog;