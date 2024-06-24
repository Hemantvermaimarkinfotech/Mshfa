import './index.scss';

import React from 'react';

const PageTitle = ({ title, caption }) => {
    return (
        <div className={'page-title'}>
            <h1 className={'page-title__title'}>{title}</h1>
            <small className={'page-title__caption'}>{caption}</small>
        </div>
    )
}

export default PageTitle;