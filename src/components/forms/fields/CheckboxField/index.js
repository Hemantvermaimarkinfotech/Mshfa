import './index.scss';

import React, { memo } from "react";
import { Checkbox, FormControlLabel } from '@material-ui/core';

const CheckboxField = memo(function CheckboxField ({  title, ...rest  }) {
    return <FormControlLabel className={'checkbox-field'} control={<Checkbox color={'primary'} {...rest} />} label={title} />
})


export default CheckboxField;