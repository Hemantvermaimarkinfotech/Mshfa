import './index.scss';

import React from "react";

import { Test } from 'components/common';

const TestsList = ({ items, compact }) => {
    return (
        <div className={'tests-list'}>{items.map(item => <Test key={item.title} data={item} compact={compact} />)}</div>
    );
};

export default TestsList;