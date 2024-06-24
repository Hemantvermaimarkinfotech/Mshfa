import './index.scss';

import React from "react";
import cx from "classnames";

const SecondaryButton = ({ text, icon = null, onClick = () => {}, type = 'button', disabled=false, classes }) => {

    const buttonClasses = cx('secondary-button', {
        [classes]: !!classes
    })

    return (
        <button className={buttonClasses} onClick={onClick} type={type} disabled={disabled}>
            {icon && icon}
            {text && <span className={'secondary-button__text'}>{text}</span>}
        </button>
    )
}

export default SecondaryButton;