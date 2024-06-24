import './index.scss';
import React from "react";
import activate from 'assets/images/activate.svg';
import archive from 'assets/images/archive.svg';

const UserActionsDropdown = ({ onActiveToggle, onArchive, isBlocked }) => {
    return (
        <div className={'profile-dropdown'}>
            <ul className={'profile-dropdown__list'}>
                <li className={'profile-dropdown__item'} onClick={onActiveToggle}>
                    <img className={'profile-dropdown__icon'} src={activate} alt=""/>
                    <span className={'profile-dropdown__text'}>{isBlocked ? "Activate" : "Block"}</span>
                </li>
                <li className={'profile-dropdown__item'} onClick={onArchive}>
                    <img className={'profile-dropdown__icon'} src={archive} alt=""/>
                    <span className={'profile-dropdown__text'}>Archive</span>
                </li>
            </ul>
        </div>
    );
}

export default UserActionsDropdown;