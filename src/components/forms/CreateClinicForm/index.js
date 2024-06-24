import "./index.scss";

import React, { useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import state from "apollo/state";

import { GlobalAppRouter } from "routes";
import { FormStepper, WizardForm, WizardStep } from "components/forms";
import { useSnackbar } from "notistack";

import Info from "./steps/Info";
import { NeutralButton, PrimaryButton } from "components/layout/buttons";

import { InfoScheme } from "./index.scheme";
import { FormattedMessage } from "react-intl";

const defaultValues = {
  title: "",
  titleAr: "",
  status: true,
  logo: null,
};

const CreateClinicForm = ({
  initialValues = {},
  isEditing = false,
  onSubmit,
}) => {
  const { activeTab: currentTab } = useParams();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const redirect = useReactiveVar(state.adProfileRedirect);
  const [formData, setFormData] = useState({
    ...defaultValues,
    ...initialValues,
  });

  const CreateClinicsFormSteps = useMemo(() => {
    return ["Info"];
  }, []);

  const getCurrentStep = () => {
    switch (currentTab) {
      default:
        return 1;
    }
  };

  const handleImageUpload = (file, preview) => {
    if (file) {
      setImage(file);
      setImagePreview(preview);
    }
  };

  const [currentStep, setCurrentStep] = useState(getCurrentStep());
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
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
    else history.push(GlobalAppRouter.paths.clinics);
  };

  const isLastStep = (step) => step >= CreateClinicsFormSteps.length;

  const handleSubmit = (values) => {
    setFormErrors([]);

    const { logo, status, ...data } = values;
 
    if (image) {
      data["logo"] = image;
    }
    if (status) {
      data["status"] = "active";
    } else {
      data["status"] = "inactive";
    }

    if (!isEditing && image === null) {
      return enqueueSnackbar("You need to upload an image", {
        variant: "error",
      });
    }

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
          steps={CreateClinicsFormSteps}
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
          <Info
            errors={formErrors}
            imagePreview={imagePreview}
            handleImageUpload={handleImageUpload}
          />
          <div className="create-doctor-form__footer">
            <NeutralButton
              text={<FormattedMessage id={"words.common.cancel"} />}
              onClick={handleCancel}
            />
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

export default CreateClinicForm;
