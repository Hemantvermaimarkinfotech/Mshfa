import './index.scss';

import React from 'react';
import { CheckCircle } from '@material-ui/icons';
import cx from "classnames";

const FormStepper = ({ steps, currentStep, onStepChange }) => {

    const isActive = (index) => (index + 1) === currentStep;
    const isHighlighted = (index) => index < currentStep || onStepChange;

    const hasHighlightedModifier = (index) => {
        return isHighlighted(index) ? 'form-stepper__step--highlighted' : '';
    }

    const hasActiveModifier = (index) => {
        return isActive(index) ? 'form-stepper__step--active' : '';
    }

    const stepClassNames = cx('form-stepper__step-content', {
       'form-stepper__clickable':  !!onStepChange
    });

    const handleClick = (index) => {
        onStepChange && onStepChange(index + 1);
    }

    const renderStep = (title, index) => {

        const completed = onStepChange || (isHighlighted(index) && !isActive(index));

        return (
            <div key={`form-step-${index}`} className={'form-stepper__step-outer'}>
                {index !== 0 ? <div className={'form-stepper__connector'} /> : null}
                <div key={index} className={`form-stepper__step ${hasHighlightedModifier(index)} ${hasActiveModifier(index)}`}>

                    <div className={stepClassNames} onClick={() => handleClick(index)}>
                        {completed ? <CheckCircle className={'form-stepper__check'} /> : <div className={'form-stepper__number'}>{index + 1}</div>}
                        <span className={'form-stepper__title'}>{title}</span>
                    </div>
                </div>
            </div>
        )
    };

    return (
        <div className={'form-stepper'}>
            { steps.map(renderStep) }
        </div>
    )
};

export default FormStepper;
