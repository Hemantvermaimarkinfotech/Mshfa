import "./index.scss";

import React from "react";
import cx from "classnames";
import noAvatar from 'assets/images/no-avatar.svg';

const ProfileAvatar = ({ image, size="small", classes }) => {

    const avatarClasses = cx('profile-avatar-outer', {
        'avatar-large': size === 'large',
        [classes]: !!classes,
    })
    return <div className={avatarClasses}>
        <img src={image || noAvatar} alt="avatar"/>
    </div>
}

export default ProfileAvatar;