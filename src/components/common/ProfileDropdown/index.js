import './index.scss';

import React from "react";
import { Link } from 'react-router-dom';
import { ExitToApp } from "@material-ui/icons";


import { useDialog } from "hooks/common";

import { GlobalAppRouter } from "routes";
import lock from 'assets/images/lock.svg';
import terms from 'assets/images/terms.svg';
import { ConfirmationDialog } from "components/common";
import {FormattedMessage} from "react-intl";

const ProfileDropdown = ({ onLinkClick, onLogout }) => {

    const { open, close } = useDialog();

    const handleConfirmLogout = () => {
        close();
        onLogout();
    }

    const handleLogoutClick = () => {
        open(ConfirmationDialog, { text: 'Are you sure you want to logout from the app?', onConfirm: handleConfirmLogout, onCancel: close }, { title: 'Confirm logout' })
    }

    return (
        <div className={'profile-dropdown'}>
            <ul className={'profile-dropdown__list'}>
                <Link className={'profile-dropdown__link'} to={{ pathname: GlobalAppRouter.paths.legal, state: { activeTab: 'privacy' } }}>
                    <li className={'profile-dropdown__item'} onClick={onLinkClick}>
                        <span className="profile-dropdown__icon-outer">
                            <img className={'icon'} src={lock} alt=""/>
                        </span>
                        <span className={'profile-dropdown__text'}><FormattedMessage id={'words.common.privacy-policy'}/></span>
                    </li>
                </Link>
                <Link className={'profile-dropdown__link'} to={{ pathname: GlobalAppRouter.paths.legal, state: { activeTab: 'terms' } }}>
                    <li className={'profile-dropdown__item'} onClick={onLinkClick}>
                        <span className="profile-dropdown__icon-outer">
                            <img className={'icon'} src={terms} alt=""/>
                        </span>
                        <span className={'profile-dropdown__text'}><FormattedMessage id={'words.common.terms-of-use'}/></span>
                    </li>
                </Link>
                <li className={'profile-dropdown__item'} onClick={handleLogoutClick}>
                    <span className="profile-dropdown__icon-outer">
                        <ExitToApp className={'icon profile-dropdown__icon profile-dropdown__icon--logout'} />
                    </span>
                    <button className={'profile-dropdown__button'}><FormattedMessage id={'words.common.log-out'}/></button>
                </li>
            </ul>
        </div>
    );
}

export default ProfileDropdown;
