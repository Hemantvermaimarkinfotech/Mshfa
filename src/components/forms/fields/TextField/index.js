import './index.scss';

import React from "react";
import { TextField as MaterialTextField } from '@material-ui/core';

const TextField = ({ size, value, ...rest }) => {

    return <MaterialTextField
        className={`text-field ${size ? `text-field--${size}` : '' }`}
        value={value || ''}
        variant={'outlined'}
        autoComplete={'off'}
        size={size}
        {...rest}
    />
}

export default TextField;