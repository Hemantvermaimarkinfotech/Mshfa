import './index.scss';

import React from 'react';
import { useFormikContext } from "formik";
import { Delete } from '@material-ui/icons';
import { SelectInput } from "../../index";

const AddTestField = ({ onRemove, title }) => {
    return (
        <div className={'add-test-field'}>
            <h3 className={'add-prescription-field__title'}>{title}</h3>
            <Delete onClick={onRemove} />
        </div>
    )
}

export default AddTestField;