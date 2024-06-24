import './index.scss';

import React from "react";

const NeutralButton = ({ text, onClick = () => {}, type = 'button', ...rest }) => {

    return (
        <button className={'neutral-button'} onClick={onClick} type={type} { ...rest}>
            <span className={'neutral-button__text'}>{text}</span>
        </button>
    )
}

export default NeutralButton;