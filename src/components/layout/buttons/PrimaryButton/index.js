import './index.scss';

import React from "react";

import cx from "classnames";

const PrimaryButton = ({ text, icon = null, onClick = () => {}, type = 'button', classes,  ...rest }) => {

    const buttonClasses = cx('primary-button', {
        [classes]: !!classes
    })
    return (
        <button className={buttonClasses} onClick={onClick} type={type} { ...rest }>
            {icon && icon}
            <span className={'primary-button__text'}>{text}</span>
        </button>
    )
}

export default PrimaryButton;