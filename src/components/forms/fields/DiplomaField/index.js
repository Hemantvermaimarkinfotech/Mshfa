import './index.scss';

import React from 'react';
import { useFormikContext } from "formik";

import TrashIcon from 'assets/images/trash-icon';

import { TextField } from "components/forms/index";
import { IconButton } from "@material-ui/core";

const DiplomaField = ({ index, onRemove }) => {

    const formik = useFormikContext();

    const isLastItem = index === formik.values.diplomas.length - 1;

    return (
        <div className={`diploma-field ${!isLastItem ? 'diploma-field--completed' : ''}`}>
            <div className="diploma-field__row">
                <TextField
                    size={'small'}
                    name={`diplomas.${index}.name`}
                    label={'Name of diploma'}
                    value={formik.values.diplomas?.[index]?.name}
                    onChange={formik.handleChange}
                    error={formik.touched.diplomas?.[index]?.name && Boolean(formik.errors.diplomas?.[index]?.name)}
                />
                { onRemove && <IconButton size="small" style={{ padding: 0 }} onClickCapture={onRemove} aria-label="more">
                    <TrashIcon />
                </IconButton>}
            </div>
        </div>
    )
}

export default DiplomaField;