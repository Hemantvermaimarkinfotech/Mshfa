import './index.scss';

import React from 'react';
import { useFormikContext } from "formik";

import { TextField, SelectInput } from "components/forms/index";

import { createRangeArray } from "utils/common";

import formsConfig from 'config/forms.config';
import TrashIcon from "assets/images/trash-icon";
import { IconButton } from "@material-ui/core";

const EducationField = ({ index, onRemove }) => {

    const formik = useFormikContext();

    const isLastItem = index === formik.values.educations.length - 1;
    const isFirstItem = index === 0;

    const mapYearsToOptions = (min, max) => {
        return createRangeArray(min, max)
            .map(year => ({ label: String(year), value: year }))
            .reverse();
    }

    const yearsOptions = mapYearsToOptions(formsConfig.educationMinYear, formsConfig.educationMaxYear);
    return (
        <div className={ "education-field" }>
            <div className="education-field__column">
                <div className="education-field__row">
                    <TextField
                        size={ 'small' }
                        name={ `educations.${ index }.place` }
                        label={ 'Place' }
                        value={ formik.values.educations?.[index]?.place }
                        onChange={ formik.handleChange }
                        error={ formik.touched.educations?.[index]?.place && Boolean(formik.errors.educations?.[index]?.place) }
                    />
                </div>
                <div className="education-field__row">
                    <SelectInput
                        value={ formik.values.educations?.[index]?.yearStart }
                        name={ `educations.${ index }.yearStart` }
                        onChange={ formik.handleChange }
                        label={ 'Year start' }
                        options={ yearsOptions }
                        error={ formik.touched.educations?.[index]?.yearStart && Boolean(formik.errors.educations?.[index]?.yearStart) }
                    />
                    <SelectInput
                        value={ formik.values.educations?.[index]?.yearEnd }
                        name={ `educations.${ index }.yearEnd` }
                        onChange={ formik.handleChange } label={ 'Year end' }
                        options={ yearsOptions }
                        error={ formik.touched.educations?.[index]?.yearEnd && Boolean(formik.errors.educations?.[index]?.yearEnd) }
                    />
                </div>
            </div>
            <div className={ "education-field__column" }>
                <div className="education-field__row">
                    <TextField
                        size={ 'small' }
                        name={ `educations.${ index }.degree` }
                        label={ 'Degree' }
                        value={ formik.values.educations[index]?.degree }
                        onChange={ formik.handleChange }
                        error={ formik.touched.educations?.[index]?.degree && Boolean(formik.errors.educations?.[index]?.degree) }
                    />
                </div>
            </div>
            { onRemove && (
                <div className="education-field__column education-field__column--extra">
                    <IconButton size="small" onClickCapture={ onRemove } aria-label="more">
                        <TrashIcon/>
                    </IconButton>
                </div>
            ) }
        </div>
    )
}

export default EducationField;