import './index.scss';

import React, { useState } from "react";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import { defaultValues, MedicationScheme } from "./index.scheme";
import { NeutralButton, PrimaryButton } from "components/layout/buttons";
import { CheckboxField, PictureField, TextField } from "components/forms/index";
import { useMedicineAPI } from "hooks/medicine";

const AddMedicineForm = ({initialValues, onAddMedicine, onCancel}) => {

    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        ...defaultValues,
        ...initialValues,
        prescriptionRequired: typeof initialValues.prescriptionRequiredNew === 'undefined' ? initialValues.prescriptionRequired : initialValues.prescriptionRequiredNew
    });

    const { createMedicine, updateMedicine } = useMedicineAPI()

    const handleSubmit = (values) => {
        const { preview, prescriptionRequiredNew, ...data } = values;
        if (!data.medicineId) {
            createMedicine(data).then(resp => {
                onAddMedicine(data);
                enqueueSnackbar("Medicine added");
            })
        } else {
            updateMedicine(data).then(resp => {
                onAddMedicine(data);
                enqueueSnackbar("Medicine updated");
            })
        }
    }

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: MedicationScheme,
        initialValues: formData,
        onSubmit: handleSubmit,
    });

    return <div className={'add-medicine-modal'}>
        <form onSubmit={formik.handleSubmit}>
                <div className="add-medicine-modal__row">
                    <PictureField
                        preview={initialValues.preview}
                        onSelect={value => formik.setFieldValue('picture', value)}
                        errorText={formik.errors.picture}
                    />
                </div>
                <div className="add-medicine-modal__row add-medicine-modal__row--hidden">
                    <TextField
                        size={'small'}
                        name={'externalId'}
                        label={'External ID'}
                        value={formik.values.externalId}
                        onChange={formik.handleChange}
                        error={formik.touched.externalId && Boolean(formik.errors.externalId)}
                        helperText={formik.touched.externalId && formik.errors.externalId}
                    />
                </div>
                <div className="add-medicine-modal__row">
                    <TextField
                        size={'small'}
                        name={'title'}
                        label={'Name of medicine'}
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        error={formik.touched.title && Boolean(formik.errors.title)}
                        helperText={formik.touched.title && formik.errors.title}
                    />
                </div>
                <div className="add-medicine-modal__row">
                    <TextField
                        size={'small'}
                        name={'description'}
                        label={'Description'}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                </div>
                <div className="add-medicine-modal__row">
                    <TextField
                        size={'small'}
                        name={'price'}
                        label={'Price'}
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        helperText={formik.touched.price && formik.errors.price}
                    />
                </div>
                <div className="add-medicine-modal__row">
                    <CheckboxField
                        title={'The medicine needs a prescription'}
                        name={'prescriptionRequired'}
                        checked={formik.values.prescriptionRequired}
                        onChange={formik.handleChange}
                    />
                </div>
                <div className="add-medicine-modal--buttons">
                    <NeutralButton text="Cancel" onClick={onCancel}/>
                    <PrimaryButton text={initialValues.medicineId ? "Save" : "Create"} type="submit"/>
                </div>
        </form>
    </div>

}

export default AddMedicineForm;