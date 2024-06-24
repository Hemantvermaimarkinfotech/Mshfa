import './index.scss';

import React from "react";

const TextButton = ({ text, onClick = () => {}, type = 'button' }) => {
    return (
        <button className={'text-button'} onClick={onClick} type={type}>
            <span className={'text-button__text'}>{text}</span>
        </button>
    )
}

export default TextButton;