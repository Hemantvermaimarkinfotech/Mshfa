import React from "react";
import { useFormikContext, FieldArray } from "formik";

import { TitledBlock } from "components/layout";
import { SecondaryButton } from "components/layout/buttons";
import { PhotoUploader } from "components/common";
import {
  EducationField,
  DiplomaField,
  SpecializationField,
  CheckboxField,
} from "components/forms";
import { useConfig } from "hooks/config";
import ClinicField from "../components/ClinicField";
import TimingField from "../components/TimingField";
import noStamp from "assets/images/no-stamp.svg";
import { useErrorMessage } from "hooks/formErrorMessage";
import { useIntl } from "react-intl";
import CategoryField from "components/forms/fields/CategoryField";

const ProfessionalInfo = ({
  preview,
  workModel,
  onStampUpload,
  onDelete,
  errors,
}) => {
  const formik = useFormikContext();
  const config = useConfig();
  const intl = useIntl();
  useErrorMessage(errors);

  const newEducation = {
    place: "",
    degree: "",
    yearStart: "",
    yearEnd: "",
  };

  const newDiploma = {
    name: "",
  };

  const newSpecialization = {
    speciality: "",
    specialistType: 1,
    grade: "",
    licenseNumber: "",
    isPrimary: false,
  };

  const handleCategoryChange = (e) => {
    // Delete old specializations
    if (
      formik.values.specializations &&
      formik.values.specializations.length > 0
    ) {
      formik.values.specializations.forEach((specialization) => {
        onDelete("specializations", specialization.id);
      });
    }

    formik.setFieldValue(`category`, e.target.value);
    formik.setFieldValue(`specializations`, [
      {
        specialistType: 1,
        speciality: "",
        grade: "",
        licenseNumber: "",
        isPrimary: true,
      },
    ]);
  };

  return (
    <>
      <div className="create-doctor-form__body">
        <div className="create-doctor-form__row">
          <TitledBlock title={"Category"}>
            <CategoryField onCategoryChange={handleCategoryChange} />
          </TitledBlock>
        </div>

        <div className="create-doctor-form__row">
          <TitledBlock title={"Specialization"}>
            <FieldArray name={"specializations"}>
              {({ push, remove }) => {
                return (
                  <>
                    {formik.values.specializations &&
                    formik.values.specializations.length > 0
                      ? formik.values.specializations.map(
                          (specialization, index) => (
                            <SpecializationField
                              key={specialization.id || index}
                              index={index}
                              onRemove={
                                formik.values.specializations.length > 1 &&
                                !specialization.isPrimary
                                  ? () => {
                                      onDelete(
                                        "specializations",
                                        specialization.id
                                      );
                                      remove(index);
                                    }
                                  : null
                              }
                            />
                          )
                        )
                      : null}
                    <SecondaryButton
                      text={"Add another specialization"}
                      onClick={() => push(newSpecialization)}
                    />
                  </>
                );
              }}
            </FieldArray>
          </TitledBlock>
        </div>
        <div className="create-doctor-form__row">
          <CheckboxField
            title={intl.formatMessage({ id: "words.common.board-certified" })}
            name={"boardCertified"}
            checked={formik.values.boardCertified}
            onChange={formik.handleChange}
          />
        </div>
        <div className="create-doctor-form__row">
          <TitledBlock localeId={"words.common.education"}>
            <FieldArray name={"educations"}>
              {({ push, remove }) => {
                return (
                  <>
                    {formik.values.educations &&
                    formik.values.educations.length > 0
                      ? formik.values.educations.map((education, index) => (
                          <EducationField
                            key={index}
                            index={index}
                            onRemove={
                              formik.values.educations.length > 1
                                ? () => {
                                    onDelete("educations", education.id);
                                    remove(index);
                                  }
                                : null
                            }
                          />
                        ))
                      : null}
                    <SecondaryButton
                      text={"Add another education"}
                      onClick={() => push(newEducation)}
                    />
                  </>
                );
              }}
            </FieldArray>
          </TitledBlock>
        </div>
        <div className="create-doctor-form__row">
          <TitledBlock localeId={"words.common.diploma"}>
            <FieldArray name={"diplomas"}>
              {({ push, remove }) => {
                return (
                  <>
                    {formik.values.diplomas && formik.values.diplomas.length > 0
                      ? formik.values.diplomas.map((diploma, index) => (
                          <DiplomaField
                            key={index}
                            index={index}
                            onRemove={
                              formik.values.diplomas.length > 1
                                ? () => {
                                    onDelete("diplomas", diploma.id);
                                    remove(index);
                                  }
                                : null
                            }
                          />
                        ))
                      : null}
                    <SecondaryButton
                      text={"Add another diploma"}
                      onClick={() => push(newDiploma)}
                    />
                  </>
                );
              }}
            </FieldArray>
          </TitledBlock>
        </div>
        <div className="create-doctor-form__row">
          <TitledBlock title={"Doctor's stamp"}>
            <PhotoUploader
              accept={".png, .jpg"}
              caption={"At least 256x256px PNG or JPG file"}
              onChange={onStampUpload}
              uploadBtnLabel={"Change Image"}
              noPreviewImage={formik.values.doctorStamp || noStamp}
              previewImage={preview}
            />
          </TitledBlock>
        </div>

        <div className="create-doctor-form__row">
          <TitledBlock title={"Doctor's clinic"}>
            <ClinicField />
          </TitledBlock>
        </div>

        {workModel == "1" && (
          <div className="create-doctor-form__row">
            <TitledBlock title={"Allowed time"}>
              <TimingField />
            </TitledBlock>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfessionalInfo;
