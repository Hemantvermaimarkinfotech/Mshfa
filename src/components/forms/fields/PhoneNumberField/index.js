import './index.scss';

import React from 'react';
import { useFormikContext } from "formik";
import { FormattedMessage } from "react-intl";

import { Delete } from '@material-ui/icons';
import { TextField } from "components/forms/index";

const PhoneNumberField = ({ index, onRemove }) => {

    const formik = useFormikContext();

    const isLastItem = index === formik.values.phones.length - 1;

    return (
        <div className={`phones-field ${!isLastItem ? 'phones-field--completed' : ''}`}>
            <div className="phones-field__row">
                <TextField
                    size={'small'}
                    name={`phones.${index}.phone`}
                    label={'Phone Number'}
                    value={formik.values.phones?.[index]?.phone}
                    onChange={formik.handleChange}
                    error={formik.touched.phones?.[index]?.phone && Boolean(formik.errors.phones?.[index]?.phone)}

                />
                {index === 0 && <span className="phone-number-primary">( <FormattedMessage id="fields.suffixes.primary"/> )</span>}
                {!!index && <Delete className={'phones-field__close'} onClick={onRemove} />}
            </div>
        </div>
    )
}

export default PhoneNumberField;