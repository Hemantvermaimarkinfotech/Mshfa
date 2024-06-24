import './index.scss';

import React from 'react';

const PageActions = ({ children }) => {
    return (
        <div className={'page-actions'}>
            {children}
        </div>
    )
}

export default PageActions;