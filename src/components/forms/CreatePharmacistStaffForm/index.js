import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import { Formik } from "formik";
import { NeutralButton, PrimaryButton } from "components/layout/buttons";
import { PhotoUploader } from "components/common";
import { TextField, SelectInput, DateInput } from "components/forms";
import { useConfig } from "hooks/config";
import { READABLE_DATE_FORMAT } from "utils/date";
import noAvatar from "assets/images/no-avatar.svg";
import { GlobalAppRouter } from 'routes';
import state from 'apollo/state';

const defaultValues = {
    avatar: null,
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    languages: ["en"],
    email: "",
    phone: "",
    adminNotes: ""
};

const CreatePharmacistStaffPage = ({
    initialValues = {},
    onSubmit
}) => {
    const history = useHistory();
    const [formErrors, setFormErrors] = useState([]);
    const [avatar, setAvatar] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const config = useConfig();

    const handleSubmit = (values) => {
        setFormErrors([]);
        const { avatar: __avatar, ...data } = values;

        if (avatar) {
            data["avatar"] = avatar;
        }

        onSubmit(data).then((response) => {
          
            if (response && !response.success) {
                if (Array.isArray(response.errors)) {
                    setFormErrors(response.errors);
                    state.doctorProfileRedirect(GlobalAppRouter.paths.Pharmacist);
                    history.push(GlobalAppRouter.paths.pharmacistStaff)
                    
                }
                
            }
        });

      
    };



    const handleAvatarUpload = (file, preview) => {
        if (file) {
            setAvatar(file);
            setAvatarPreview(preview);
        }
    };

    return (
        <div className={"create-doctor-form"}>
            <Formik
                initialValues={{ ...defaultValues, ...initialValues }}
                onSubmit={handleSubmit}
            >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <div className="create-doctor-form__body">
                            <PhotoUploader
                                accept={'.png, .jpg, .jpeg'}
                                caption={'At least 256x256px PNG or JPG file'}
                                noPreviewImage={avatarPreview || noAvatar}
                                onChange={handleAvatarUpload}
                                previewImage={avatarPreview}
                            />
                            <div className="create-doctor-form__row create-doctor-form__row--twin">
                                <TextField
                                    size={'small'}
                                    name={'firstName'}
                                    label={'First Name'}
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.firstName && formik.errors.firstName}
                                />
                                <TextField
                                    size={'small'}
                                    name={'lastName'}
                                    label={'Last Name'}
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    error={formik.touched.lastName && formik.errors.lastName}
                                />
                            </div>
                            <div className="create-doctor-form__row create-doctor-form__row--twin">
                                <DateInput
                                    label={'Date of Birth'}
                                    name={'dob'}
                                    value={formik.values.dob}
                                    onChange={formik.handleChange}
                                    yearSelect={true}
                                    error={formik.touched.dob && formik.errors.dob}
                                    dateFormat={READABLE_DATE_FORMAT}
                                />
                                <SelectInput
                                    name={'gender'}
                                    label={'Gender'}
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
                                    label={'Languages'}
                                    options={config.languages}
                                    onChange={formik.handleChange}
                                    value={formik.values.languages}
                                    error={formik.touched.languages && formik.errors.languages}
                                />
                            </div>
                            <div className="create-doctor-form__row create-doctor-form__row--twin">
                                <TextField
                                    size={'small'}
                                    name={'email'}
                                    label={'Email'}
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
                                    name={'adminNotes'}
                                    label={'Admin Notes'}
                                    value={formik.values.adminNotes}
                                    onChange={formik.handleChange}
                                    error={formik.touched.adminNotes && formik.errors.adminNotes}
                                    helperText={formik.touched.adminNotes && formik.errors.adminNotes}
                                />
                            </div>
                        </div>
                        <div className="create-doctor-form__footer">
                        <PrimaryButton
                            text="Save"
                            type="submit"
                        />

                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default CreatePharmacistStaffPage;
