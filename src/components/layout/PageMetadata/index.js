import './index.scss';

import React from 'react';

const PageMetadata = ({ children }) => {
    return (
        <div className={'page-metadata'}>
            {children}
        </div>
    )
}

export default PageMetadata;