import './index.scss';

import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import { GlobalAppRouter } from "routes";
import { FormStepper, WizardForm, WizardStep } from 'components/forms';

import GeneralInfo from "./steps/GeneralInfo";
import WorkingHoursInfo from "./steps/WorkingHoursInfo";
import { NeutralButton, PrimaryButton } from "components/layout/buttons";

import { GeneralInfoScheme, WorkingHoursScheme, defaultValues } from './index.scheme';

const createPharmacyFormSteps = ['General info' , 'Working hours'];

const CreatePharmacyForm = ({ initialValues = {}, onSubmit }) => {

    const history = useHistory();

    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({...defaultValues, ...initialValues});

    const [deletedPhones, setDeletedPhones] = useState([]);

    const [deletedWorkingHours, setDeletedWorkingHours] = useState([]);

    const handleNextStep = (values) => {
        setFormData(values);
        setCurrentStep((currentStep) => currentStep + 1)
    };

    const handlePrevStep = () => {
        setCurrentStep((currentStep) => currentStep - 1)
    };

    const handleCancel = () => {
        history.push(GlobalAppRouter.paths.pharmacies);
    };

    const isLastStep = (step) => step >= createPharmacyFormSteps.length;

    const handleSubmit = (values) => {

        const data = { ...values };

        if (deletedPhones.length) {
            data['phones'].push(...deletedPhones);
        }
        if (deletedWorkingHours.length) {
            deletedWorkingHours.forEach(workingHours => {
                const { day, ...rest } = workingHours;
                data['workingHours'][day].push({ ...rest });
            })
        }
        onSubmit(data);
    }

    const handleDeleteArrayItem = (type, id, day = null) => {
        if (id) {
            const deletedItem = { id, delete: true };
            switch (type) {
                case 'phones':
                    setDeletedPhones(prevState => [...prevState, deletedItem]);
                    break;
                case 'workingHours':
                    setDeletedWorkingHours(prevState => [...prevState, {...deletedItem, day }]);
                    break;
            }
        }
    }

    return (
        <div className={'create-pharmacy-form'}>
            <div className="create-pharmacy-form__header">
                <FormStepper steps={createPharmacyFormSteps} currentStep={currentStep} />
            </div>
            <WizardForm onSubmit={handleSubmit} formData={formData} onNextStep={handleNextStep} currentStep={currentStep} isLastStep={isLastStep}>
                <WizardStep name={'general'} validationSchema={GeneralInfoScheme}>
                    <GeneralInfo onDelete={handleDeleteArrayItem} />
                    <div className="create-pharmacy-form__footer">
                        <NeutralButton text={'Cancel'} onClick={handleCancel} />
                        <PrimaryButton text={'Next'} type={'submit'} />
                    </div>
                </WizardStep>
                <WizardStep name={'workingHours'} validationSchema={WorkingHoursScheme}>
                    <WorkingHoursInfo onDelete={handleDeleteArrayItem} />
                    <div className="create-pharmacy-form__footer">
                        <NeutralButton text={'Back'} onClick={handlePrevStep} />
                        <PrimaryButton text={initialValues.pharmacyId ? "Save" : "Create"} type={'submit'} />
                    </div>
                </WizardStep>

            </WizardForm>
        </div>
    )
}

export default CreatePharmacyForm;