import './index.scss';
import React from "react";
import {FormattedMessage} from "react-intl";

const SimpleActionsDropdown = ({ onEdit, onArchive }) => {
    return (
        <div className={'actions-dropdown'}>
            <ul className={'actions-dropdown__list'}>
                <li className={'actions-dropdown__item'} onClick={onEdit}>
                    <span className={'actions-dropdown__text'}><FormattedMessage id={'words.common.edit'}/></span>
                </li>
                <li className={'actions-dropdown__item'} onClick={onArchive}>
                    <span className={'actions-dropdown__text'}>Archive</span>
                </li>
            </ul>
        </div>
    );
}

export default SimpleActionsDropdown;
