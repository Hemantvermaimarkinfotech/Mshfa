import './index.scss';

import React from "react";

const Paper = ({ children, className = '', ...rest }) => {
    return <div className={`paper ${className}`} {...rest}>{children}</div>
}

export default Paper;
