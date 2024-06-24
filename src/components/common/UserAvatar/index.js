import "./index.scss";
import React from "react";
import cx from "classnames";

import noAvatar from "assets/images/no-avatar.svg";

const UserAvatar = ({ user, classes }) => {

    const userClasses = cx("user-name", {
        classes: !!classes
    })

    return <div className={userClasses}>
        <div className="user-name__image-outer">
            <img className="user-name__image" src={user?.avatar || noAvatar} alt={''} />
        </div>
        <span className={'user-name__text'}>{`${user?.firstName || ''} ${user?.lastName || ''}`}</span>
    </div>
}

export default UserAvatar;