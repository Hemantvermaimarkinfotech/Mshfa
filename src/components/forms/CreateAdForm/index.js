import "./index.scss";

import React, { useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import state from "apollo/state";

import { GlobalAppRouter } from "routes";
import { FormStepper, WizardForm, WizardStep } from "components/forms";
import { useSnackbar } from "notistack";

import Options from "./steps/Options";
import Info from "./steps/Info";
import Preferences from "./steps/Preferences";
import { NeutralButton, PrimaryButton } from "components/layout/buttons";

import { InfoScheme, PreferencesScheme, OptionsScheme } from "./index.scheme";

import { FormattedMessage } from "react-intl";

const defaultValues = {
  name: "",
  imageUrl: null,
  toOpen: "0",
  expiryDateTime: "",
  isInteractive: false,
  isActive: true,
  doctorId: null,
  serviceType: "1",
  isApproved: true,
};

console.log('dafault ad:', defaultValues);


const CreateAdForm = ({ initialValues = {}, isEditing = false, onSubmit }) => {
  const { activeTab: currentTab } = useParams();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const redirect = useReactiveVar(state.adProfileRedirect);
  const [formData, setFormData] = useState({
    ...defaultValues,
    ...initialValues,
  });

  const CreateAdFormSteps = useMemo(() => {
    return ["Info", "Preferences", "Options"];
  }, []);

  const getCurrentStep = () => {
    switch (currentTab) {
      case "options":
        return 3;
      case "preferences":
        return 2;
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
    else history.push(GlobalAppRouter.paths.ads);
  };

  const isLastStep = (step) => step >= CreateAdFormSteps.length;
  const handleSubmit = (values) => {

    console.log('dafault ad:', values);

    setFormErrors([]);

    const { expireTime, expireDate, toOpen, imageUrl, ...data } = values;

    if (image) {
      data["imageUrl"] = image;
    }

    data["toOpen"] = +toOpen;

    if (toOpen === "0") {
      data["toOpen"] = null;
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
          steps={CreateAdFormSteps}
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
            <PrimaryButton text={"Next"} type={"submit"} />
          </div>
        </WizardStep>

        <WizardStep name={"options"} validationSchema={OptionsScheme}>
          <Options errors={formErrors} />
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

export default CreateAdForm;
