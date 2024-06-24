import './index.scss';

import React from "react";

const DiplomasList = ({ items }) => {

    const renderItem = (item, index) => {
        return (
            <li className={'diplomas-list__item'} key={index}>
                <span className={'diplomas-list__text'}>{item.name}</span>
            </li>
        )
    }

    return (
        <ul className={'diplomas-list'}>
            {items.map(renderItem)}
        </ul>
    )
}

export default DiplomasList;