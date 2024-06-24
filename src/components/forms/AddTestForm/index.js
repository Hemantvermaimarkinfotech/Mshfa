import './index.scss';

import React, {forwardRef, useMemo} from 'react';
import { FieldArray, Formik } from "formik";

import {AutocompleteInput, CheckboxField} from "components/forms";

import { AddTestField } from "components/forms";
import {useConfig} from "hooks/config";

const initialValues = {
    items: []
};

const AddTestForm = forwardRef(({ defaultValues = {}, onSubmit, onDelete }, ref) => {

    const { tests } = useConfig();

    const handleAddTest = (setter, value, prevValue) => {
        const test = tests.find(t => t.key === value);
        const isSameItem = prevValue.find((item) => item.key === test?.key);
        if (!!value) {
            if (!isSameItem) {
                setter('items', [ ...prevValue, test ])
            } else if (isSameItem.delete) {
                const prevValuesWithReturnedTest = prevValue.map(val => {
                    if (val.key === test?.key) return {...val, delete: false}
                    return val
                })
                setter('items', [ ...prevValuesWithReturnedTest ])
            }
        }

    }
    return (
        <div className={ 'add-prescription-form' }>
            <Formik innerRef={ref} initialValues={ { items: [...initialValues.items, ...defaultValues.items] } } onSubmit={ onSubmit }>
                {(props) => {
                    return (
                        <div>
                            <AutocompleteInput
                                blurOnSelect
                                name={ 'test' }
                                label={ 'Search a test by name' }
                                options={ tests.filter(test => !props.values.items.includes(test))}
                                onChange={({target}) => handleAddTest(props.setFieldValue, target.value, props.values.items)}
                                value={props.values.items.filter(i => !i.delete)}
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
                                                            <AddTestField key={ item.key } title={item.val || item.title} onRemove={() => replace(index, { ...item, delete: true  })} />
                                                            : null
                                                    })
                                                    : null
                                            }
                                        </>
                                    )
                                } }
                            </FieldArray>
                        </div>
                    )
                }}
            </Formik>
        </div>
    )
});

export default AddTestForm;
