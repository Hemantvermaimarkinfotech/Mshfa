import './index.scss';

import React, {useState} from "react";
import {useIntl} from "react-intl";
import {useFormik} from "formik";
import {useSnackbar} from "notistack";

import {defaultValues, OrderItemScheme} from "./index.scheme";
import {NeutralButton, PrimaryButton} from "components/layout/buttons";
import {AutocompleteInput, CheckboxField, TextField} from "components/forms/index";
import {useConfig} from "hooks/config";


const AddOrderItemForm = ({initialValues, onAddOrderItem, onCancel}) => {

    const [formData, setFormData] = useState({
        ...defaultValues,
        ...initialValues,
    });

    const {tests} = useConfig();
    const intl = useIntl()

    const formik = useFormik({
        enableReinitialize: true,
        validationSchema: OrderItemScheme,
        initialValues: formData,
        onSubmit: onAddOrderItem
    });

    return <div className={'add-order-item-modal'}>
        <form onSubmit={formik.handleSubmit}>
            <div className="add-order-item-modal__row">
                <AutocompleteInput
                    creatable
                    blurOnSelect
                    name={'id'}
                    label={'Search a test by name'}
                    options={tests}
                    onChange={(value) => {
                        formik.setFieldValue('id', value.target.value)
                        formik.setFieldValue('title', value.target.label)
                    }
                    }
                    value={formik.values.id}
                />
            </div>
            <div className="add-order-item-modal__row">
                <TextField
                    size={'small'}
                    name={'qty'}
                    label={'Quantity'}
                    type={"number"}
                    value={formik.values.qty}
                    onChange={formik.handleChange}
                    error={formik.touched.qty && Boolean(formik.errors.qty)}
                    helperText={formik.touched.qty && formik.errors.qty}
                />
            </div>
            <div className="add-order-item-modal__row">
                <CheckboxField
                    title={'The lab test needs a home service'}
                    name={'homeService'}
                    checked={formik.values.homeService}
                    onChange={formik.handleChange}
                />
            </div>
            <div className="add-order-item-modal--buttons">
                <NeutralButton text={intl.formatMessage({id: 'words.common.cancel'})} onClick={onCancel}/>
                <PrimaryButton text={"Add"} type="submit"/>
            </div>
        </form>
    </div>

}

export default AddOrderItemForm;
