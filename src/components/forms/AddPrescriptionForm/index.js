import './index.scss';

import React, { forwardRef, useMemo } from 'react';
import { FieldArray, Formik } from "formik";

import AddPrescriptionFormScheme from "./index.schema";
import AutocompleteInput from "../fields/AutocompleteInput";
import { AddPrescriptionField, TextField } from "../index";
import { createFilterOptions } from "@material-ui/lab";
import { useDrugList } from "hooks/config";
import GlobalLoader from "components/layout/loaders/GlobalLoader";
import {useIntl} from "react-intl";

const initialValues = {
    notes: "",
    items: []
};

const filter = createFilterOptions();

const AddPrescriptionForm = forwardRef(({ defaultValues = {}, onSubmit, onDelete }, ref) => {

    const { drugs, loading } = useDrugList();
    const drugsArray = useMemo(() => drugs ? drugs.map(drug => drug.val) : [], [drugs])
    const intl = useIntl()


    const newItem = {
        medicine: "",
        dosage: "",
        route: "",
        frequency: "",
        directions: "",
        duration: ""
    }

    const handleRemoveMedicine = (index, setter, prevItems) => {
        const items = [...prevItems];
        items.splice(index, 1);
        setter('items', items)
    }

    const handleAddMedicine = (setter, value, prevValue) => {

        const sameItem = prevValue.find((item) => item.medicine === value);
        if (!sameItem) {
            setter('items', [ ...prevValue, { ...newItem, medicine: value } ])
        }
    }

    return (
        <div className={ 'add-prescription-form' }>
            {loading ? <GlobalLoader /> : (
                <Formik innerRef={ref} initialValues={ { ...initialValues, ...defaultValues } } onSubmit={ onSubmit }
                        validationSchema={ AddPrescriptionFormScheme }>
                    {(props) => {
                        return (
                            <div>
                                <AutocompleteInput
                                    blurOnSelect
                                    name={ 'medication' }
                                    label={ 'Search a medication and add its condition of use' }
                                    options={drugsArray}
                                    onChange={(event) => {
                                        handleAddMedicine(props.setFieldValue, event.target.label, props.values.items)
                                    }}
                                    value={props.values.items.map(item => ({ label: item.medicine, value: item.medicine }))}
                                />
                                <FieldArray name={ 'items' }>
                                    { ({ replace }) => {
                                        return (
                                            <>
                                                {
                                                    props.values.items &&
                                                    props.values.items.length > 0 ?
                                                        props.values.items.map((item, index) => {
                                                            return !item.delete ?
                                                                <AddPrescriptionField key={ item.id || index } index={ index } onRemove={ () => handleRemoveMedicine(index, props.setFieldValue, props.values.items) }/>
                                                                : null
                                                        })
                                                        : null
                                                }
                                            </>
                                        )
                                    } }
                                </FieldArray>
                                <TextField
                                    multiline
                                    size={'medium'}
                                    name={'notes'}
                                    label={intl.formatMessage({id: 'words.common.doctor-note'})}
                                    value={props.values.notes}
                                    onChange={props.handleChange}
                                    error={props.touched.notes && Boolean(props.errors.notes)}
                                    helperText={props.touched.notes && props.errors.notes}
                                />
                            </div>
                        )
                    }}
                </Formik>
                )}
        </div>
    )
});

export default AddPrescriptionForm;
