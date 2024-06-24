import './index.scss';

import React, {useMemo} from 'react';
import { useFormikContext } from "formik";
import { Delete } from '@material-ui/icons';
import {AutocompleteInput, SelectInput} from "../../index";
import {useConfig} from "hooks/config";

const AddPrescriptionField = ({ index, onRemove }) => {

    const formik = useFormikContext();

    const {
        prescriptionDosages,
        prescriptionRoutes,
        prescriptionFrequencies,
        prescriptionDirections,
        prescriptionDurations
    } = useConfig();
    const dosages = useMemo(() => {
        return [...prescriptionDosages].sort();
    }, [prescriptionDosages])

    const routes = useMemo(() => {
        //console.log(prescriptionRoutes, prescriptionRoutes.sort());
        return [...prescriptionRoutes].sort();
    }, [prescriptionRoutes])

    const frequencies = useMemo(() => {
        return [...prescriptionFrequencies].sort();
    }, [prescriptionFrequencies])

    const directions = useMemo(() => {
        return [...prescriptionDirections].sort();
    }, [prescriptionDirections])

    const durations = useMemo(() => {
        return [...prescriptionDurations].sort();
    }, [prescriptionDurations])

    return (
        <div className={'add-prescription-field'}>
            <div className={'add-prescription-field__header'}>
                <h3 className={'add-prescription-field__title'}>{formik.values.items?.[index]?.medicine || 'dq dqdsqdq dqdq '}</h3>
                <Delete onClick={onRemove} />
            </div>
            <div className="add-prescription-field__row">
                <AutocompleteInput
                    blurOnSelect
                    autoSelect
                    creatable={true}
                    name={ `items.${index}.dosage` }
                    label={ 'Dosage & Unit' }
                    options={dosages}
                    onChange={formik.handleChange}
                    value={formik.values?.items?.[index]?.dosage}
                    error={formik.touched?.items?.[index]?.dosage && Boolean(formik.errors?.items?.[index]?.dosage)}
                    errorText={formik.touched?.items?.[index]?.dosage && formik.errors?.items?.[index]?.dosage}
                />
                <AutocompleteInput
                    blurOnSelect
                    autoSelect
                    creatable={true}
                    name={`items.${index}.route`}
                    label={'Route'}
                    options={routes}
                    onChange={formik.handleChange}
                    value={formik.values.items?.[index]?.route}
                    error={formik.touched.items?.[index]?.route && Boolean(formik.errors.items?.[index]?.route)}
                    errorText={formik.touched.items?.[index]?.route && formik.errors.items?.[index]?.route}
                />
                <AutocompleteInput
                    blurOnSelect
                    autoSelect
                    creatable={true}
                    name={`items.${index}.frequency`}
                    label={'Frequency'}
                    options={frequencies}
                    onChange={formik.handleChange}
                    value={formik.values?.items?.[index]?.frequency}
                    error={formik.touched?.items?.[index]?.frequency && Boolean(formik.errors?.items?.[index]?.frequency)}
                    errorText={formik.touched?.items?.[index]?.frequency && formik.errors?.items?.[index]?.frequency}
                />
            </div>
            <div className="add-prescription-field__row">
                <AutocompleteInput
                    blurOnSelect
                    autoSelect
                    creatable={true}
                    name={`items.${index}.directions`}
                    label={'Directions'}
                    options={directions}
                    onChange={formik.handleChange}
                    value={formik.values?.items?.[index]?.directions}
                    error={formik.touched?.items?.[index]?.directions && Boolean(formik.errors?.items?.[index]?.directions)}
                    errorText={formik.touched?.items?.[index]?.directions && formik.errors?.items?.[index]?.directions}
                />
                <AutocompleteInput
                    blurOnSelect
                    autoSelect
                    creatable={true}
                    name={`items.${index}.duration`}
                    label={'Duration'}
                    options={durations}
                    onChange={formik.handleChange}
                    value={formik.values.items?.[index]?.duration}
                    error={formik.touched.items?.[index]?.duration && Boolean(formik.errors.items?.[index]?.duration)}
                    errorText={formik.touched.items?.[index]?.duration && formik.errors.items?.[index]?.duration}
                />

            </div>
        </div>
    )
}

export default AddPrescriptionField;