import "./index.scss";

import React, { useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import state from "apollo/state";
import { useSnackbar } from "notistack";
import { GlobalAppRouter } from "routes";
import { FormStepper, WizardForm, WizardStep } from "components/forms";

import LabTest from "./steps/LabTest";
import Info from "./steps/Info";
import Patients from "./steps/Patients";
import Discount from "./steps/Discount";
import Options from "./steps/Options";
import { NeutralButton, PrimaryButton } from "components/layout/buttons";

import {
  InfoScheme,
  DiscountScheme,
  PatientsScheme,
  LabTestScheme,
  OptionsScheme,
} from "./index.scheme";
import { FormattedMessage } from "react-intl";

const defaultValues = {
  couponCode: "",
  couponName: "",
  startDate: "",
  endDate: "",
  serviceType: 0,
  fixedAmount: 0,
  maxDiscountAmount: 0,
  discountPercentage: 0,
  maxNoRedeem: 1,
  percentFixed: "0", // to check percentage or fix amount
  homeServiceSetup: 2,
  isActive: true,
  allServices: false,
  allDoctors: false,
  allLabTests: false,
  allPatients: false,
  // promoCodeType: 0,
  users: [],
  labTests: [],
  pat: [],
  doc: [],
};

const CreateCouponForm = ({
  initialValues = {},
  isEditing = false,
  onSubmit,
}) => {
  const { activeTab: currentTab } = useParams();
  const history = useHistory();
  const redirect = useReactiveVar(state.couponProfileRedirect);
  const [formData, setFormData] = useState({
    ...defaultValues,
    ...initialValues,
  });
  const { enqueueSnackbar } = useSnackbar();

  const showLabtestStep =
    formData.homeServiceSetup === "4" && formData.serviceType === "5";

  const CreateCouponFormSteps = useMemo(() => {
    if (showLabtestStep) {
      return ["Info", "Patients", "LabTest", "Options"];
    } else {
      return ["Info", "Patients", "Discount", "Options"];
    }
  }, [showLabtestStep]);

  const getCurrentStep = () => {
    if (showLabtestStep) {
      switch (currentTab) {
        case "patients":
          return 2;
        case "labTest":
          return 3;
        case "options":
          return 4;
        default:
          return 1;
      }
    } else {
      switch (currentTab) {
        case "patients":
          return 2;
        case "options":
          return 4;
        case "discount":
          return 3;
        default:
          return 1;
      }
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
    else history.push(GlobalAppRouter.paths.coupons);
  };

  const isLastStep = (step) => step >= CreateCouponFormSteps.length;
  const handleSubmit = (values) => {
    setFormErrors([]);
    const {
      serviceType,
      //  promoCodeType,
      id,
      labTests,
      startDate,
      fromTime,
      toTime,
      labtestName,
      labtestNewPrice,
      endDate,
      fromDate,
      toDate,
      allDoctors,
      maxNoRedeem,
      fixedAmount,
      maxDiscountAmount,
      homeServiceSetup,
      discountPercentage,
      doc,
      percentFixed,
      couponCode,
      pat,
      ...data
    } = values;

    data["couponCode"] = couponCode.toUpperCase();
    data["labTests"] = labTests;
    data["users"] = doc.concat(pat);
    data["fixedAmount"] = fixedAmount ? parseFloat(fixedAmount).toFixed(2) : 0;
    data["maxDiscountAmount"] = maxDiscountAmount
      ? parseFloat(maxDiscountAmount).toFixed(2)
      : 0;
    data["discountPercentage"] = discountPercentage
      ? parseFloat(discountPercentage).toFixed(2)
      : 0;

    data["homeServiceSetup"] = +homeServiceSetup;
    data["serviceType"] = +serviceType;
    //  data["promoCodeType"] = +promoCodeType;

    // data["id"] = id;
    data["allDoctors"] = allDoctors;
    data["startDate"] = startDate;
    data["endDate"] = endDate;
    data["maxNoRedeem"] = maxNoRedeem;
    if (!data["fixedAmount"] && !data["discountPercentage"]) {
      return enqueueSnackbar(
        "You need to provide either a fixed amount or a discount percentage.",
        {
          variant: "error",
        }
      );
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
          steps={CreateCouponFormSteps}
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
          <Info errors={formErrors} isEditing={isEditing} />
          <div className="create-doctor-form__footer">
            <NeutralButton
              text={<FormattedMessage id={"words.common.cancel"} />}
              onClick={handleCancel}
            />
            <PrimaryButton text={"Next"} type={"submit"} />
          </div>
        </WizardStep>
        <WizardStep name={"patients"} validationSchema={PatientsScheme}>
          <Patients errors={formErrors} isEditing={isEditing} />
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

        {showLabtestStep && (
          <WizardStep name={"labTest"} validationSchema={LabTestScheme}>
            <LabTest errors={formErrors} />
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
        )}

        {!showLabtestStep && (
          <WizardStep name={"discount"} validationSchema={DiscountScheme}>
            <Discount errors={formErrors} isEditing={isEditing} />
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
        )}

        <WizardStep name={"options"} validationSchema={OptionsScheme}>
          <Options errors={formErrors} isEditing={isEditing} />
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

export default CreateCouponForm;
