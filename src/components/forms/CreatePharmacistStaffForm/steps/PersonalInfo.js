import React from "react";
import { useFormikContext } from "formik";

import { PhotoUploader } from "components/common";
import { TextField, SelectInput, DateInput } from "components/forms";
import { useConfig } from "hooks/config";
import { READABLE_DATE_FORMAT } from "utils/date";
import { createPharmacistStaffMutation } from "api/pharmacystaff.api"; // Import the mutation

import noAvatar from "assets/images/no-avatar.svg";
import { useIntl } from "react-intl";

const PersonalInfo = ({ preview, onUploadAvatar, errors }) => {
    const formik = useFormikContext(); // Use useFormikContext to access formik context
    const config = useConfig();
    console.log('configgggggggg',config)
    const intl = useIntl();
    const [createPharmacistStaff] = useMutation(createPharmacistStaffMutation);
    const handleSubmit = async (values) => {
        try {
            const response = await createPharmacistStaff({ variables: values }); // Call the mutation with form values
            console.log(response); // Handle the response
        } catch (error) {
            console.error(error); // Handle errors
        }
    };

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
                        error={formik.touched.firstName && formik.errors.firstName}
                    />
    
                    <TextField
                        size={'small'}
                        name={'lastName'}
                        label={intl.formatMessage({id: 'words.common.last-name'})}
                        
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && formik.errors.lastName}
                    />
                </div>
                <div className="create-doctor-form__row create-doctor-form__row--twin">
                    <DateInput
                        label={intl.formatMessage({id: 'words.common.birth-date'})}
                        name={'dob'}
                        value={formik.values.dob}
                        onChange={formik.handleChange}
                        yearSelect={true}
                        error={formik.touched.dob && formik.errors.dob}
                        dateFormat={READABLE_DATE_FORMAT}
                    />
                    <SelectInput
                        name={'gender'}
                        label={intl.formatMessage({id: 'words.common.gender'})}
                        options={config.genders}
                        onChange={formik.handleChange}
                        value={formik.values.gender}
                        error={formik.touched.gender && formik.errors.gender}
                    />
                </div>
                <div className="create-doctor-form__row">
                    <SelectInput
                        multiple
                        name={'languages'}
                        label={intl.formatMessage({id: 'words.common.languages'})}
                        options={config.languages}
                        onChange={formik.handleChange}
                        value={Array.isArray(formik.values.languages) ? formik.values.languages : []}
                        error={formik.touched.languages && formik.errors.languages}
                    />
                </div>
                <div className="create-doctor-form__row create-doctor-form__row--twin">
                    <TextField
                        size={'small'}
                        name={'email'}
                        label={intl.formatMessage({id: 'words.common.email'})}
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        size={'small'}
                        name={'phone'}
                        label={'Phone'}
                        placeholder={'+XX-XXX-XXXXXXX'}
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && formik.errors.phone}
                    />
                </div>
                <div className="create-doctor-form__row">
                    <TextField
                        size={'small'}
                        name={'adminNotes'}
                        label={'Admin notes'}
                        value={formik.values.adminNotes}
                        onChange={formik.handleChange}
                        error={formik.touched.adminNotes && formik.errors.adminNotes}
                        helperText={formik.touched.adminNotes && formik.errors.adminNotes}
                    />
                </div>
            </div>
        </>
    );
    
}

export default PersonalInfo;

