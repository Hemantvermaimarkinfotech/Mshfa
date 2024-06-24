import "./index.scss";

import React, { useMemo, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import state from "apollo/state";

import { GlobalAppRouter } from "routes";
import config from "config/forms.config";
import { FormStepper, WizardForm, WizardStep } from "components/forms";

import PersonalInfo from "./steps/PersonalInfo";
import ProfessionalInfo from "./steps/ProfessionalInfo";
import ScheduleInfo from "./steps/ScheduleInfo";
import PriceInfo from "./steps/PriceInfo";
import { NeutralButton, PrimaryButton } from "components/layout/buttons";

import {
  PersonaInfoScheme,
  ProfessionalInfoScheme,
  SchedulesScheme,
  PriceInfoScheme,
} from "./index.scheme";
import { rangesToDaysArray } from "utils/date";
import { doctorCommissionType } from "config/doctor";
import { FormattedMessage } from "react-intl";

const defaultValues = {
  avatar: null,
  firstName: "",
  lastName: "",
  dob: "",
  gender: "",
  languages: ["en"],
  educations: [
    {
      place: "",
      degree: "",
      yearStart: "",
      yearEnd: "",
    },
  ],
  diplomas: [
    {
      name: "",
    },
  ],
  doctorStamp: null,
  specializations: [
    {
      specialistType: 1,
      speciality: "",
      grade: "",
      licenseNumber: "",
      isPrimary: true,
    },
  ],
  schedules: {
    sun: [],
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
  },
  clinicId: null,
  category: null,
  boardCertified: false,
  appointmentTimeBox: 30,
  appointmentTimeBoxFollowup: 30,
  daysOff: [],
  email: "",
  phone: "",
  adminNotes: "",
  serviceCost: null,
  serviceCostFollowup: null,
  bookBefore: 1,
  bookBeforeType: "1",
  cancelBefore: 1,
  cancelBeforeType: "1",
};

const CreateDoctorForm = ({
  initialValues = {},
  isEditing = false,
  onSubmit,
  workModel = config.doctorTypes.schedule,
}) => {
  const { activeTab: currentTab } = useParams();
  const history = useHistory();
  const redirect = useReactiveVar(state.doctorProfileRedirect);
  const createDoctorFormSteps = useMemo(() => {
    return workModel === config.doctorTypes.schedule
      ? [
          "Personal info",
          "Professional info",
          "Schedule",
          <FormattedMessage id={"words.common.price"} />,
        ]
      : ["Personal info", "Professional info"];
  }, [workModel]);

  const getCurrentStep = () => {
    switch (currentTab) {
      case "schedule":
        return workModel === config.doctorTypes.schedule ? 3 : 1;
      case "professional":
        return 2;
      default:
        return 1;
    }
  };

  const [currentStep, setCurrentStep] = useState(getCurrentStep());
  const [formData, setFormData] = useState({
    ...defaultValues,
    ...initialValues,
  });
  const [formErrors, setFormErrors] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [stamp, setStamp] = useState(null);
  const [stampPreview, setStampPreview] = useState(null);
  const [deletedDiplomas, setDeletedDiplomas] = useState([]);
  const [deletedEducations, setDeletedEducations] = useState([]);
  const [deletedSpecializations, setDeletedSpecializations] = useState([]);
  const [deletedSchedules, setDeletedSchedules] = useState([]);

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
    else history.push(GlobalAppRouter.paths.doctors);
  };

  const isLastStep = (step) => step >= createDoctorFormSteps.length;

  const handleSubmit = (values) => {
    setFormErrors([]);
    const {
      daysOff,
      doctorStamp,
      avatar: __avatar,
      serviceCost,
      serviceCostFollowup,
      bookBefore,
      bookBeforeType,
      cancelBefore,
      cancelBeforeType,
      ...data
    } = values;

    data["bookBefore"] = workModel == "2" ? 0 : bookBefore;
    data["bookBeforeType"] = workModel == "2" ? 0 : bookBeforeType;
    data["cancelBefore"] = workModel == "2" ? 0 : cancelBefore;
    data["cancelBeforeType"] = workModel == "2" ? 0 : cancelBeforeType;

    data["serviceCost"] = serviceCost ? parseFloat(serviceCost).toFixed(2) : 0;
    data["serviceCostFollowup"] = serviceCostFollowup
      ? parseFloat(serviceCostFollowup).toFixed(2)
      : 0;

    data["daysOff"] = rangesToDaysArray(daysOff);

    if (deletedDiplomas.length) {
      data["diplomas"].push(...deletedDiplomas);
    }

    if (deletedSpecializations.length) {
      data["specializations"].push(...deletedSpecializations);
    }

    if (deletedEducations.length) {
      data["educations"].push(...deletedEducations);
    }

    if (deletedSchedules.length) {
      deletedSchedules.forEach((schedule) => {
        const { day, ...rest } = schedule;
        data["schedules"][day].push({ ...rest });
      });
    }
    if (avatar) {
      data["avatar"] = avatar;
    }
    if (!data.doctorId) {
      data["workModel"] = workModel;
    }

    if (stamp) {
      data["doctorStamp"] = stamp;
    }

    onSubmit(data).then((response) => {
      if (response && !response.success) {
        if (Array.isArray(response.errors)) {
          setFormErrors(response.errors);
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

  const handleStampUpload = (file, preview) => {
    if (file) {
      setStamp(file);
      setStampPreview(preview);
    }
  };

  const onStepChange = (step) => {
    setCurrentStep(step);
  };

  const handleDeleteArrayItem = (type, id, day = null) => {
    if (id) {
      const deletedItem = { id, delete: true };
      switch (type) {
        case "schedules":
          setDeletedSchedules((prevState) => [
            ...prevState,
            { ...deletedItem, day },
          ]);
          break;
        case "specializations":
          setDeletedSpecializations((prevState) => [...prevState, deletedItem]);
          break;
        case "diplomas":
          setDeletedDiplomas((prevState) => [...prevState, deletedItem]);
          break;
        case "educations":
          setDeletedEducations((prevState) => [...prevState, deletedItem]);
          break;
      }
    }
  };
  return (
    <div className={"create-doctor-form"}>
      <div className="create-doctor-form__header">
        <FormStepper
          steps={createDoctorFormSteps}
          currentStep={currentStep}
          onStepChange={initialValues.doctorId ? onStepChange : null}
        />
      </div>
      <WizardForm
        onSubmit={handleSubmit}
        submitOnLastStep={!initialValues.doctorId}
        formData={formData}
        onNextStep={handleNextStep}
        currentStep={currentStep}
        isLastStep={isLastStep}
      >
        <WizardStep name={"personal"} validationSchema={PersonaInfoScheme}>
          <PersonalInfo
            preview={avatarPreview}
            onUploadAvatar={handleAvatarUpload}
            onDelete={handleDeleteArrayItem}
            errors={formErrors}
          />
          <div className="create-doctor-form__footer">
            <NeutralButton
              text={<FormattedMessage id={"words.common.cancel"} />}
              onClick={handleCancel}
            />
            <PrimaryButton
              text={initialValues.doctorId ? "Save" : "Next"}
              type={"submit"}
            />
          </div>
        </WizardStep>
        <WizardStep
          name={"professional"}
          validationSchema={ProfessionalInfoScheme}
        >
          <ProfessionalInfo
            preview={stampPreview}
            workModel={workModel}
            onStampUpload={handleStampUpload}
            onDelete={handleDeleteArrayItem}
            errors={formErrors}
          />
          <div className="create-doctor-form__footer">
            <NeutralButton
              text={<FormattedMessage id={"words.common.cancel"} />}
              onClick={handleCancel}
            />
            {!isEditing && (
              <NeutralButton text={"Back"} onClick={handlePrevStep} />
            )}
            <PrimaryButton
              text={
                initialValues.doctorId
                  ? "Save"
                  : workModel === config.doctorTypes.schedule
                  ? "Next"
                  : "Create"
              }
              type={"submit"}
            />
          </div>
        </WizardStep>
        {workModel === config.doctorTypes.schedule && (
          <WizardStep name={"schedule"} validationSchema={SchedulesScheme}>
            <ScheduleInfo
              onDelete={handleDeleteArrayItem}
              errors={formErrors}
            />
            <div className="create-doctor-form__footer">
              <NeutralButton
                text={<FormattedMessage id={"words.common.cancel"} />}
                onClick={handleCancel}
              />
              {!isEditing && (
                <NeutralButton text={"Back"} onClick={handlePrevStep} />
              )}
              <PrimaryButton
                text={initialValues.doctorId ? "Save" : "Next"}
                type={"submit"}
              />
            </div>
          </WizardStep>
        )}
        <WizardStep name={"price"} validationSchema={PriceInfoScheme}>
          <PriceInfo errors={formErrors} />
          <div className="create-doctor-form__footer">
            <NeutralButton
              text={<FormattedMessage id={"words.common.cancel"} />}
              onClick={handleCancel}
            />
            {!isEditing && (
              <NeutralButton text={"Back"} onClick={handlePrevStep} />
            )}
            <PrimaryButton
              text={initialValues.doctorId ? "Save" : "Create"}
              type={"submit"}
            />
          </div>
        </WizardStep>
      </WizardForm>
    </div>
  );
};

export default CreateDoctorForm;
