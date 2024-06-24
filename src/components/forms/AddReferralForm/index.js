import './index.scss';

import React, { forwardRef, useMemo } from 'react';
import { Formik } from "formik";

import {TextField, SelectInput, AutocompleteInput} from "components/forms";

import AddReferralFormScheme from "./index.schema";
import { useConfig } from "hooks/config";
import {useIntl} from "react-intl";

const initialValues = {
    hospital: "",
    department: "",
    complaintsForTransfer: "",
    reasonForReferral: ""
};

const AddReferralForm = forwardRef(({ defaultValues = {}, onSubmit }, ref) => {

    const { departments, hospitals } = useConfig();
    const intl = useIntl()

    const hospitalsArray = useMemo(() => hospitals.map(hospital => hospital.val), [hospitals])
    const departmentsArray = useMemo(() => departments.map(department => department.val), [departments])

    return (
        <div className={ 'add-referral-form' }>
            <Formik innerRef={ref} initialValues={ { ...initialValues, ...defaultValues } } onSubmit={ onSubmit } validationSchema={AddReferralFormScheme}>
                {(props) => {
                    return (
                        <div>
                            <AutocompleteInput
                                blurOnSelect
                                autoSelect
                                name={ 'hospital' }
                                label={ intl.formatMessage({id: 'words.common.hospital'}) }
                                options={hospitalsArray}
                                onChange={props.handleChange}
                                error={props.touched?.hospital && Boolean(props.errors?.hospital)}
                                value={props.values?.hospital}
                                errorText={props.touched?.hospital && props.errors?.hospital}
                            />
                            <AutocompleteInput
                                blurOnSelect
                                autoSelect
                                name={`department`}
                                label={'Department'}
                                options={departmentsArray}
                                onChange={props.handleChange}
                                value={props.values?.department}
                                error={props.touched?.department && Boolean(props.errors?.department)}
                                errorText={props.touched?.department && props.errors?.department}
                            />

                            <TextField
                                size={'small'}
                                name={'complaintsForTransfer'}
                                label={intl.formatMessage({id: 'words.common.complaints-for-transfer'})}
                                value={props.values.complaintsForTransfer}
                                onChange={props.handleChange}
                                error={props.touched.complaintsForTransfer && Boolean(props.errors.complaintsForTransfer)}
                                helperText={props.touched.complaintsForTransfer && props.errors.complaintsForTransfer}
                            />
                            <TextField
                                size={'small'}
                                name={'reasonForReferral'}
                                label={"Reasons for Referral"}
                                value={props.values.reasonForReferral}
                                onChange={props.handleChange}
                                error={props.touched.reasonForReferral && Boolean(props.errors.reasonForReferral)}
                                helperText={props.touched.reasonForReferral && props.errors.reasonForReferral}
                            />
                        </div>
                    )
                }}
            </Formik>
        </div>
    )
});

export default AddReferralForm;
