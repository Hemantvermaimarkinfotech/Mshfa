import './index.scss';

import React from "react";
import {FormattedMessage} from "react-intl";

import { Edit, Delete } from '@material-ui/icons';
import { IconButton } from "@material-ui/core";

const MedicineActionsDropdown = ({ onEdit, onDelete }) => {
    return (
        <div className={'medicine-actions-dropdown'}>
            <ul className={'medicine-actions-dropdown__list'}>
                <li className={'medicine-actions-dropdown__item'} onClick={onEdit}>
                    <IconButton><Edit /></IconButton>
                    <span className={'medicine-actions-dropdown__text'}>Edit</span>
                </li>
                <li className={'medicine-actions-dropdown__item'} onClick={onDelete}>
                    <IconButton><Delete /></IconButton>
                    <span className={'medicine-actions-dropdown__text'}><FormattedMessage id={'words.common.delete'}/></span>
                </li>
            </ul>
        </div>
    );
}

export default MedicineActionsDropdown;
