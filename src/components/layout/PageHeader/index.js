import './index.scss';

import React from 'react';

const PageHeader = ({ children }) => {
    return (
        <div className={'page-header'}>
            {children}
        </div>
    )
}

export default PageHeader;