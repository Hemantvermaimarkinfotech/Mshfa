import './index.scss';
import React, { Fragment } from "react";

const MedicationActionsDropdown = ({ onApprove, onReject, onEdit, onArchive, status }) => {
    return (
        <div className={'medications-dropdown'}>
            <ul className={'medications-dropdown__list'}>
                {status === '0' && <Fragment>
                    <li className={'medications-dropdown__item'} onClick={onApprove}>
                        <span className={'medications-dropdown__text'}>Approve</span>
                    </li>
                    <li className={'medications-dropdown__item'} onClick={onReject}>
                        <span className={'medications-dropdown__text'}>Reject</span>
                    </li>
                </Fragment>}
                <li className={'medications-dropdown__item'} onClick={onEdit}>
                    <span className={'medications-dropdown__text'}>Edit</span>
                </li>
                <li className={'medications-dropdown__item'} onClick={onArchive}>
                    <span className={'medications-dropdown__text'}>Archive</span>
                </li>
            </ul>
        </div>
    );
}

export default MedicationActionsDropdown;