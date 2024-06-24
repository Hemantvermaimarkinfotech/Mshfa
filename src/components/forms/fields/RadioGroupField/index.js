import './index.scss';

import React from "react";
import { RadioGroup, Radio, FormControl, FormControlLabel, FormLabel } from "@material-ui/core";


const RadioGroupField = ({ size, label, options, value, ...rest }) => {

    const renderOptions = (options) => {
        return options.map(option => <FormControlLabel key={option.value} value={option.value} control={<Radio size={size} color={'primary'} />} label={option.label} /> )
    }

    const mapValue = (value) => {
        if (typeof value === 'object') {
            if (value.hasOwnProperty('key') && value.hasOwnProperty('key')) {
                return value.key;
            }
        }
        return String(value);
    }

    const mapOptions = (options) => {
        return options.map(option => {
            if (typeof option === 'string') {
                return { label: option, value: option };
            } else if (typeof option === 'object') {
                if (option.hasOwnProperty('key') && option.hasOwnProperty('key')) {
                    return { label: option.val, value: option.key };
                } else {
                    return { label: option, value: option };
                }

            }
            return { label: option, value: option };
        })
    }

    return (
        <FormControl component="fieldset" className={'radio-group-field'}>
            {label && <FormLabel component="legend">{label}</FormLabel> }
            <RadioGroup aria-label={rest.name} value={mapValue(value)} {...rest}>
                {renderOptions(mapOptions(options))}
            </RadioGroup>
        </FormControl>
    );
};

export default RadioGroupField;