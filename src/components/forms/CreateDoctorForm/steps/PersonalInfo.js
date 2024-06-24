import React from "react";
import { useFormikContext } from "formik";

import { PhotoUploader } from "components/common";
import { TextField, SelectInput, DateInput } from "components/forms";
import { useConfig } from "hooks/config";
import { READABLE_DATE_FORMAT } from "utils/date";

import noAvatar from "assets/images/no-avatar.svg";
import { useErrorMessage } from "hooks/formErrorMessage";
import {FormattedMessage, useIntl} from "react-intl";

const PersonalInfo = ({ preview, onUploadAvatar, errors }) => {
    const formik = useFormikContext();
    const config = useConfig();
    const intl = useIntl();
    useErrorMessage(errors);

    const onPhoneChanged = (event, rest) => {
        const formatValue = (value) => {
            if (!value) return value;
            if (value.indexOf('+') !== 0) {
                return `+${value}`;
            }
            return value;
        }
        formik.setFieldValue('phone', formatValue(event.target.value));
    }
    return (
        <>
            <div className="create-doctor-form__body">
                <PhotoUploader
                    accept={'.png, .jpg, .jpeg'}
                    caption={'At least 256x256px PNG or JPG file'}
                    noPreviewImage={formik.values.profileImage || noAvatar}
                    onChange={onUploadAvatar}
                    previewImage={preview}
                />
                <div className="create-doctor-form__row create-doctor-form__row--twin">
                    <TextField
                        size={'small'}
                        name={'firstName'}
                        label={intl.formatMessage({id: 'words.common.first-name'})}
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    />
                    <TextField
                        size={'small'}
                        name={'lastName'}
                        label={intl.formatMessage({id: 'words.common.last-name'})}
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    />
                </div>
                <div className="create-doctor-form__row create-doctor-form__row--twin">
                    <DateInput
                        label={intl.formatMessage({id: 'words.common.birth-date'})}
                        name={'dob'}
                        value={formik.values.dob}
                        onChange={formik.handleChange}
                        yearSelect={true}
                        error={formik.touched.dob && Boolean(formik.errors.dob)}
                        dateFormat={READABLE_DATE_FORMAT}
                    />
                    <SelectInput
                        name={'gender'}
                        label={intl.formatMessage({id: 'words.common.gender'})}
                        options={config.genders}
                        onChange={formik.handleChange}
                        value={formik.values.gender}
                        error={formik.touched.gender && Boolean(formik.errors.gender)}
                    />
                </div>
                <div className="create-doctor-form__row">
                    <SelectInput
                        multiple
                        name={'languages'}
                        label={intl.formatMessage({id: 'words.common.languages'})}
                        options={config.languages}
                        onChange={formik.handleChange}
                        value={formik.values.languages}
                        error={formik.touched.languages && Boolean(formik.errors.languages)}
                    />
                </div>
                <div className="create-doctor-form__row create-doctor-form__row--twin">
                    <TextField
                        size={'small'}
                        name={'email'}
                        disabled={!!formik.values.doctorId}
                        label={intl.formatMessage({id: 'words.common.email'})}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                    />
                    <TextField
                        size={'small'}
                        name={'phone'}
                        label={'Phone'}
                        placeholder={'+XX-XXX-XXXXXXX'}
                        value={formik.values.phone}
                        onChange={onPhoneChanged}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                    />
                </div>
                <div className="create-doctor-form__row">
                    <TextField
                        size={'small'}
                        name={'adminNotes'}
                        label={'Admin notes'}
                        value={formik.values.adminNotes}
                        onChange={formik.handleChange}
                        error={formik.touched.adminNotes && Boolean(formik.errors.adminNotes)}
                        helperText={formik.touched.adminNotes && formik.errors.adminNotes}
                    />
                </div>
            </div>
        </>
    )
}

export default PersonalInfo;
