import './index.scss';

import React, { forwardRef } from 'react';
import { Formik } from "formik";
import { Autocomplete } from '@material-ui/lab'
import { InputAdornment } from '@material-ui/core'
import { SelectInput, TextField } from "components/forms";
import { useConfig } from "hooks/config";
import { TitledBlock } from "components/layout";
import {useIntl} from "react-intl";

const initialValues = {
    area: '',
    occupation: '',
    weight: '',
    height: '',
    allergies: [],
    diseases: [],
    socialHabits: [],
    additionalInfo: '',
}

const EditProfileInfoForm = forwardRef(({ defaultValues = {}, onSubmit }, ref) => {


    const injectValues = (initialValues, defaultValues) => {

        const isDataProvided = !!Object.keys(defaultValues).length;
        const address = defaultValues?.addresses?.find(address => address.isPrimary) || defaultValues?.addresses?.[0];
        if (isDataProvided) {
            return {
                ...initialValues,
                ...defaultValues?.medicalInfo,
                area: address ? address.area : '',
                occupation: defaultValues?.occupation?.key || '',
            }
        }

        return initialValues;
    }

    const config = useConfig();
    const intl = useIntl()

    return (
        <div className={ 'edit-profile-info-form' }>
            <Formik innerRef={ref} initialValues={{...injectValues(initialValues, defaultValues)}} onSubmit={ onSubmit }>
                {(props) => {
                    return (
                       <div>
                           <div className={'edit-profile-info-form__row'}>
                               <SelectInput
                                   name={`area`}
                                   label={intl.formatMessage({id: 'words.common.area'})}
                                   options={config.areas}
                                   onChange={props.handleChange}
                                   value={String(props.values?.area)}
                                   error={props.touched?.area && Boolean(props.errors?.area)}
                                   errorText={props.touched?.area && props.errors?.area}
                               />
                               <SelectInput
                                   name={`occupation`}
                                   label={intl.formatMessage({id: 'words.common.occupation'})}
                                   options={config.occupations}
                                   onChange={props.handleChange}
                                   value={String(props.values?.occupation)}
                                   error={props.touched?.occupation && Boolean(props.errors?.occupation)}
                                   errorText={props.touched?.occupation && props.errors?.occupation}
                               />
                           </div>
                           <TitledBlock localeId={'words.common.medical-info'}>
                               <div className={'edit-profile-info-form__row edit-profile-info-form__row--compact'}>
                                   <TextField
                                       size={'small'}
                                       InputProps={{
                                           endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                                       }}
                                       name={'weight'}
                                       label={intl.formatMessage({id: 'words.common.weight'})}
                                       value={props.values.weight}
                                       onChange={props.handleChange}
                                       error={props.touched.weight && Boolean(props.errors.weight)}
                                       helperText={props.touched.weight && props.errors.weight}
                                   />
                                   <TextField
                                       size={'small'}
                                       InputProps={{
                                           endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                       }}
                                       name={'height'}
                                       label={intl.formatMessage({id: 'words.common.height'})}
                                       value={props.values.height}
                                       onChange={props.handleChange}
                                       error={props.touched.height && Boolean(props.errors.height)}
                                       helperText={props.touched.height && props.errors.height}
                                   />
                               </div>
                               <div className={'edit-profile-info-form__row'}>
                                   <Autocomplete
                                       size={'small'}
                                       multiple
                                       options={config.allergies}
                                       getOptionLabel={(option) => option.val}
                                       getOptionSelected={(option, value) => option.val === value.val }
                                       defaultValue={props.values.allergies}
                                       onChange={(e, value) => props.setFieldValue('allergies', value)}
                                       renderInput={(params) => (
                                           <TextField
                                               {...params}
                                               variant="outlined"
                                               label={intl.formatMessage({id: 'words.common.allergies'})}
                                               placeholder="Choose an allergy"
                                           />
                                       )}
                                   />
                               </div>
                               <div className={'edit-profile-info-form__row'}>
                                   <Autocomplete
                                       size={'small'}
                                       multiple
                                       options={config.diseases}
                                       getOptionLabel={(option) => option.val}
                                       getOptionSelected={(option, value) => option.val === value.val }
                                       defaultValue={props.values.diseases}
                                       onChange={(e, value) => props.setFieldValue('diseases', value)}
                                       renderInput={(params) => (
                                           <TextField
                                               {...params}
                                               variant="outlined"
                                               label={intl.formatMessage({id: 'words.common.diseases'})}
                                               placeholder="Choose a disease"
                                           />
                                       )}
                                   />
                               </div>
                               <div className={'edit-profile-info-form__row'}>
                                   <Autocomplete
                                       multiple
                                       options={config.socialHabits}
                                       getOptionLabel={(option) => option.val}
                                       getOptionSelected={(option, value) => option.val === value.val }
                                       defaultValue={props.values.socialHabits}
                                       onChange={(e, value) => props.setFieldValue('socialHabits', value)}
                                       renderInput={(params) => (
                                           <TextField
                                               {...params}
                                               variant="outlined"
                                               label={intl.formatMessage({id: 'words.common.social-habits'})}
                                               placeholder="Choose a habit"
                                           />
                                       )}
                                   />
                               </div>
                               <div className={'edit-profile-info-form__row'}>
                                   <TextField
                                       multiline
                                       size={'small'}
                                       name={'additionalInfo'}
                                       label={intl.formatMessage({id: 'words.common.additional-info'})}
                                       value={props.values.additionalInfo}
                                       onChange={props.handleChange}
                                       error={props.touched.additionalInfo && Boolean(props.errors.additionalInfo)}
                                       helperText={props.touched.additionalInfo && props.errors.additionalInfo}
                                   />
                               </div>
                           </TitledBlock>
                       </div>
                    )
                }}
            </Formik>
        </div>
    )
})

export default EditProfileInfoForm;
