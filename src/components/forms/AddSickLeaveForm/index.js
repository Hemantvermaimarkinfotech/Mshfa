import './index.scss';

import React, { forwardRef } from 'react';
import { Formik } from "formik";

import { DateInput, TextField, SelectInput } from "../index";

import AddSickLeaveFormScheme from "./index.schema";
import {useIntl} from "react-intl";

const initialValues = {
    companyName: "",
    occupation: "",
    startDate: '',
    days: 0
};

const AddSickLeaveForm = forwardRef(({ defaultValues = {}, onSubmit }, ref) => {

    const setInitialData = (initialData, defaultData) => {
        const { companyName, occupation, startDate, days } = defaultData || {};
        return {...initialData, companyName, occupation, startDate, days };
    }
    const intl = useIntl()

    return (
        <div className={ 'add-sick-leave-form' }>
            <Formik innerRef={ref} initialValues={setInitialData(initialValues, defaultValues)} onSubmit={ onSubmit } validationSchema={AddSickLeaveFormScheme}>
                {(props) => {
                    return (
                        <div>
                            <div className="add-sick-leave-form__row">
                                <TextField
                                    size={'small'}
                                    name={'companyName'}
                                    label={"Company name"}
                                    value={props.values.companyName}
                                    onChange={props.handleChange}
                                    error={props.touched.companyName && Boolean(props.errors.companyName)}
                                    helperText={props.touched.companyName && props.errors.companyName}
                                />
                            </div>
                            <div className="add-sick-leave-form__row">
                                <TextField
                                    size={'small'}
                                    name={'occupation'}
                                    label={intl.formatMessage({id: 'words.common.occupation'})}
                                    value={props.values.occupation}
                                    onChange={props.handleChange}
                                    error={props.touched.occupation && Boolean(props.errors.occupation)}
                                    helperText={props.touched.occupation && props.errors.occupation}
                                />
                            </div>
                            <div className="add-sick-leave-form__row">
                                <DateInput
                                    name={'startDate'}
                                    label={"Choose start date"}
                                    value={props.values.startDate}
                                    onChange={props.handleChange}
                                    error={props.touched?.startDate && Boolean(props.errors?.startDate)}
                                    errorText={props.touched?.startDate && props.errors?.startDate}

                                />
                                <SelectInput
                                    name={`days`}
                                    label={intl.formatMessage({id: 'words.common.days'})}
                                    options={['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14']}
                                    onChange={props.handleChange}
                                    value={String(props.values?.days)}
                                    error={props.touched?.days && Boolean(props.errors?.days)}
                                    errorText={props.touched?.days && props.errors?.days}
                                />
                            </div>
                        </div>
                    )
                }}
            </Formik>
        </div>
    )
});

export default AddSickLeaveForm;
