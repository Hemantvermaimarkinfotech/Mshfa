import './index.scss';

import React from "react";

const WizardStep = ({ children, name }) => {
    return (
        <div className={`wizard-step wizard-step--${name}`}>
            {children}
        </div>
    )
};

export default WizardStep;