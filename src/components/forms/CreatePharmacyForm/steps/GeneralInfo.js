import React from "react";
import { FieldArray, useFormikContext } from "formik";
import { useSnackbar } from "notistack";
import {useIntl} from "react-intl";

import { PhotoUploader } from "components/common";
import { TextField, SelectInput, DateInput, DiplomaField } from "components/forms";
import { useConfig } from "hooks/config";

import { TitledBlock } from "components/layout";
import AutocompleteInput from "components/forms/fields/AutocompleteInput";
import formsConfig from "config/forms.config";
import { InputAdornment } from "@material-ui/core";
import { SecondaryButton } from "components/layout/buttons";
import PhoneNumberField from "components/forms/fields/PhoneNumberField";
import { useErrorMessage } from "hooks/formErrorMessage";

const GeneralInfo = ({ onDelete }) => {
    const formik = useFormikContext();
    const config = useConfig();
    const intl = useIntl()

    const newPhoneNumber = {
        phone: '',
    };
    useErrorMessage();

    return (
        <div className="create-pharmacy-form__body">
            <div className="create-pharmacy-form__row">
                <TextField
                    size={'small'}
                    name={'title'}
                    label={'Pharmacy name'}
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                />
            </div>
            <TitledBlock title={"Address"}>
                <div className="create-pharmacy-form__row--twin">
                    <AutocompleteInput
                        name={'area'}
                        label={intl.formatMessage({id: 'words.common.area'})}
                        options={config.areas}
                        onChange={formik.handleChange}
                        value={formik.values.area}
                        error={formik.touched.area && Boolean(formik.errors.area)}
                    />
                    <SelectInput
                        name={'block'}
                        label={intl.formatMessage({id: 'words.common.block'})}
                        options={formsConfig.addressBlocksOptions}
                        onChange={formik.handleChange}
                        value={formik.values.block}
                        error={formik.touched.block && Boolean(formik.errors.block)}
                    />
                </div>
                <div className="create-pharmacy-form__row--twin">
                    <TextField
                        size={'small'}
                        name={'street'}
                        label={intl.formatMessage({id: 'words.common.street'})}
                        value={formik.values.street}
                        onChange={formik.handleChange}
                        error={formik.touched.street && Boolean(formik.errors.street)}
                    />
                    <TextField
                        size={'small'}
                        name={'building'}
                        label={intl.formatMessage({id: 'words.common.building'})}
                        value={formik.values.building}
                        onChange={formik.handleChange}
                        error={formik.touched.building && Boolean(formik.errors.building)}
                    />
                </div>
            </TitledBlock>
            <TitledBlock title={"Delivery info"}>
                <div className="create-pharmacy-form__row delivery">
                    <SelectInput
                        classNames="delivery-time-input"
                        name="deliveryTime"
                        label={intl.formatMessage({id: 'words.common.approximate-delivery-time'})}
                        options={formsConfig.deliveryTimes}
                        onChange={formik.handleChange}
                        value={formik.values.deliveryTime}
                        error={formik.touched.deliveryTime && Boolean(formik.errors.deliveryTime)}
                    />
                    <TextField
                        size={'small'}
                        name={'deliveryFee'}
                        label={'Delivery Fee'}
                        value={formik.values.deliveryFee}
                        onChange={formik.handleChange}
                        error={formik.touched.deliveryFee && Boolean(formik.errors.deliveryFee)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">KD</InputAdornment>,
                        }}
                    />
                    <TextField
                        size={'small'}
                        name={'minimumOrderPrice'}
                        label={'Minimum Order Price'}
                        value={formik.values.minimumOrderPrice}
                        onChange={formik.handleChange}
                        error={formik.touched.minimumOrderPrice && Boolean(formik.errors.minimumOrderPrice)}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">KD</InputAdornment>,
                        }}
                    />
                </div>
            </TitledBlock>
            <TitledBlock title={"Contacts"}>
                <div className="create-pharmacy-form__row--twin">
                    <TextField
                        size={'small'}
                        name={'email'}
                        label={intl.formatMessage({id: 'words.common.email'})}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                    />
                </div>

                <FieldArray name={'phones'}>
                    {({ push, remove }) => {
                        return (
                            <>
                                {
                                    formik.values.phones &&
                                    formik.values.phones.length > 0 ?
                                        formik.values.phones.map((phone, index) => <PhoneNumberField key={index} index={index} onRemove={() => {
                                            onDelete('phones', phone.id);
                                            remove(index);
                                        }} />)
                                        : null
                                }
                                <SecondaryButton text={'Add another phone number'} onClick={() => push(newPhoneNumber)} />
                            </>
                        )
                    }}
                </FieldArray>
            </TitledBlock>
        </div>
    )
}

export default GeneralInfo;
