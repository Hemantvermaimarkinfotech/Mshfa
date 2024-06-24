import "./index.scss";

import React, { useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import state from "apollo/state";

import { GlobalAppRouter } from "routes";
import { FormStepper, WizardForm, WizardStep } from "components/forms";

import Info from "./steps/Info";
import Preferences from "./steps/Preferences";
import { NeutralButton, PrimaryButton } from "components/layout/buttons";

import { InfoScheme, PreferencesScheme } from "./index.scheme";

import { FormattedMessage } from "react-intl";

const defaultValues = {
  title: "",
  titleAr: "",
  descriptionAr: "",
  description: "",
  doctorId: "",
  price: "",
  activationDate: "",
  expirationDate: "",
  numOfAppointments: 0,
};

const CreatePackageForm = ({
  initialValues = {},
  isEditing = false,
  onSubmit,
}) => {
  const { activeTab: currentTab } = useParams();
  const history = useHistory();
  const redirect = useReactiveVar(state.packageProfileRedirect);
  const [formData, setFormData] = useState({
    ...defaultValues,
    ...initialValues,
  });

  const CreatePackageFormSteps = useMemo(() => {
    return ["Info", "Preferences"];
  }, []);

  const getCurrentStep = () => {
    switch (currentTab) {
      case "preferences":
        return 2;
      default:
        return 1;
    }
  };

  const [currentStep, setCurrentStep] = useState(getCurrentStep());
  const [formErrors, setFormErrors] = useState([]);

  const handleNextStep = (values) => {
    setFormErrors([]);
    setFormData(values);
    setCurrentStep((currentStep) => currentStep + 1);
  };

  const handlePrevStep = () => {
    setFormErrors([]);
    setCurrentStep((currentStep) => currentStep - 1);
  };

  const handleCancel = () => {
    if (redirect) history.push(redirect);
    else history.push(GlobalAppRouter.paths.packages);
  };

  const isLastStep = (step) => step >= CreatePackageFormSteps.length;
  const handleSubmit = (values) => {
    setFormErrors([]);

    const { ...data } = values;

    onSubmit(data).then((response) => {
      if (response && !response.success) {
        if (Array.isArray(response.errors)) {
          setFormErrors(response.errors);
        }
      }
    });
  };

  const onStepChange = (step) => {
    setCurrentStep(step);
  };

  return (
    <div className={"create-doctor-form"}>
      <div className="create-doctor-form__header">
        <FormStepper
          steps={CreatePackageFormSteps}
          currentStep={currentStep}
          onStepChange={isEditing ? onStepChange : null}
        />
      </div>
      <WizardForm
        onSubmit={handleSubmit}
        submitOnLastStep={true}
        formData={formData}
        onNextStep={handleNextStep}
        currentStep={currentStep}
        isLastStep={isLastStep}
      >
        <WizardStep name={"info"} validationSchema={InfoScheme}>
          <Info isEditing={isEditing} errors={formErrors} />
          <div className="create-doctor-form__footer">
            <NeutralButton
              text={<FormattedMessage id={"words.common.cancel"} />}
              onClick={handleCancel}
            />
            <PrimaryButton text={"Next"} type={"submit"} />
          </div>
        </WizardStep>
        <WizardStep name={"preferences"} validationSchema={PreferencesScheme}>
          <Preferences errors={formErrors} isEditing={isEditing} />
          <div className="create-doctor-form__footer">
            <NeutralButton
              text={<FormattedMessage id={"words.common.cancel"} />}
              onClick={handleCancel}
            />
            {!isEditing && (
              <NeutralButton text={"Back"} onClick={handlePrevStep} />
            )}
            <PrimaryButton
              text={!isEditing ? "Create" : "Save"}
              type={"submit"}
            />
          </div>
        </WizardStep>
      </WizardForm>
    </div>
  );
};

export default CreatePackageForm;
