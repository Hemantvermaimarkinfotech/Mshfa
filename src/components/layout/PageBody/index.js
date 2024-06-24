import './index.scss';

import React from 'react';
import cx from "classnames";

const PageBody = ({ children, classes }) => {

    const bodyClasses = cx('page-body', {
        [classes]: !!classes,
    });

    return <div className={bodyClasses}>
            {children}
        </div>
}

export default PageBody;