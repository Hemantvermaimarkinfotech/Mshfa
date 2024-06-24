import './index.scss';

import React, { useState } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { defaultValues, PharmacistScheme } from "./index.scheme";
import { NeutralButton, PrimaryButton } from "components/layout/buttons";
import { CheckboxField, TextField } from "components/forms/index";
import { usePharmacistAPI } from "hooks/pharmacists";
import { useErrorMessage } from "hooks/formErrorMessage";

const AddPharmacistForm = ({pharmacyId, initialValues, onAddPharmacist, onCancel}) => {

    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({...defaultValues, ...initialValues});
    const [formErrors, setFormErrors] = useState([]);
    const { createPharmacist, updatePharmacist } = usePharmacistAPI()

    const handleSubmit = (data) => {
        setFormErrors([]);
        if (!data.id) {
            createPharmacist(data, pharmacyId).then(response => {
                if (response.success) {
                    enqueueSnackbar("Pharmacist added");
                    onAddPharmacist(data);
                } else {
                    setFormErrors(response.errors)
                }
            })
        } else {
            updatePharmacist(data).then(response => {
                if (response.success) {
                    enqueueSnackbar("Pharmacist updated");
                    onAddPharmacist(data);
                } else {
                    setFormErrors(response.errors)
                }
            })
        }

    }

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: PharmacistScheme,
        initialValues: formData,
        onSubmit: handleSubmit,
    });

    useErrorMessage(formErrors, formik);

    return <div className={'add-pharmacist-modal'}>
        <div className="description">
            When creating pharmacists, the system will automatically send an email credential to the pharmacist to log into the system.
        </div>
        <form onSubmit={formik.handleSubmit}>
            <div className="add-pharmacist-modal__row">
                <TextField
                    size={'small'}
                    name={'firstName'}
                    label={'First name'}
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                />
            </div>
            <div className="add-pharmacist-modal__row">
                <TextField
                    size={'small'}
                    name={'lastName'}
                    label={'Last name'}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                />
            </div>
            <div className="add-pharmacist-modal__row">
                <TextField
                    size={'small'}
                    name={'email'}
                    label={'Email'}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                />
            </div>
            <div className="add-pharmacist-modal__row">
                <TextField
                    size={'small'}
                    name={'notes'}
                    label={'Notes'}
                    value={formik.values.notes}
                    onChange={formik.handleChange}
                    error={formik.touched.notes && Boolean(formik.errors.notes)}
                />
            </div>
            <div className="add-medicine-modal--buttons">
                <NeutralButton text="Cancel" onClick={onCancel}/>
                <PrimaryButton text={initialValues.id ? "Save" : "Create"} type="submit"/>
            </div>
        </form>
    </div>

}

export default AddPharmacistForm;