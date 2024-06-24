import './index.scss';
import React from "react";
import { Edit } from '@material-ui/icons';
import activate from 'assets/images/activate.svg';
import archive from 'assets/images/archive.svg';
import { IconButton } from "@material-ui/core";
import {FormattedMessage} from "react-intl";

const ProfileActionsDropdown = (
    {
        onEdit,
        onActiveToggle,
        onArchive,
        isBlocked,
        editTitle="Edit Pharmacy"
    }) => {
    return (
        <div className={'profile-actions-dropdown'}>
            <ul className={'profile-actions-dropdown__list'}>
                <li className={'profile-actions-dropdown__item'} onClick={onEdit}>
                    <IconButton><Edit /></IconButton>
                    <span className={'profile-actions-dropdown__text'}>{editTitle}</span>
                </li>
                {isBlocked === true || isBlocked === false ?
                <li className={'profile-actions-dropdown__item'} onClick={onActiveToggle}>
                    <img className={'profile-actions-dropdown__icon'} src={activate} alt=""/>
                    <span className={'profile-actions-dropdown__text'}>{isBlocked ? "Activate" : "Block"}</span>
                </li> :null}
                <li className={'profile-actions-dropdown__item'} onClick={onArchive}>
                    <img className={'profile-actions-dropdown__icon'} src={archive} alt=""/>
                    <span className={'profile-actions-dropdown__text'}><FormattedMessage id={'words.common.delete'}/></span>
                </li>
            </ul>
        </div>
    );
}

export default ProfileActionsDropdown;
