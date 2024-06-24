import "./index.scss";

import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";

import {
  TextField,
  SelectInput,
  RadioGroupField,
  CheckboxField,
} from "components/forms/index";
import { useConfig } from "hooks/config";
import { FormControlLabel, IconButton, Radio } from "@material-ui/core";
import TrashIcon from "assets/images/trash-icon";
import { AutocompleteInput } from "components/forms";
import { FormattedMessage, useIntl } from "react-intl";

const SpecializationField = ({ index, onRemove }) => {
  const formik = useFormikContext();
  const config = useConfig();
  const intl = useIntl();
  const [filteredSpecializations, setFilteredSpecializations] = useState([]);

  const isFirstItem = index === 0;
  const gradesOptions = config.doctorGrades.map((grade) => ({
    key: grade,
    val: grade,
  }));

  const setIsPrimary = () => {
    formik.values.specializations.map((specialization, key) => {
      if (formik.values.specializations?.[key]?.isPrimary) {
        formik.setFieldValue(`specializations.${key}.isPrimary`, false);
      }
    });
    formik.setFieldValue(`specializations.${index}.isPrimary`, true);
  };

  useEffect(() => {
    if (formik.values.category) {
      let docSpecializations = config.doctorSpecialities.filter(
        (specialization) => {
          return specialization.category == formik.values.category;
        }
      );
      setFilteredSpecializations(docSpecializations);
    }
  }, [formik.values.category, formik.setFieldValue]);

  return (
    <div className={"specialization-field"}>
      <div className="specialization-field__row specialization-field__row--semi">
        <RadioGroupField
          size={"small"}
          options={config.doctorSpecializationTypes}
          value={formik.values.specializations?.[index]?.specialistType}
          name={`specializations.${index}.specialistType`}
          onChange={formik.handleChange}
        />
        <FormControlLabel
          checked={formik.values.specializations?.[index]?.isPrimary}
          control={<Radio size={"small"} color={"primary"} />}
          label={"Is Primary"}
          onClick={setIsPrimary}
        />
      </div>
      <div className="specialization-field__row specialization-field__row--semi">
        <AutocompleteInput
          blurOnSelect
          name={`specializations.${index}.speciality`}
          label={"Speciality"}
          options={filteredSpecializations}
          onChange={formik.handleChange}
          value={formik.values.specializations?.[index]?.speciality}
          error={
            formik.touched.specializations?.[index]?.speciality &&
            Boolean(formik.errors.specializations?.[index]?.speciality)
          }
        />

        <SelectInput
          label={intl.formatMessage({ id: "words.common.grade" })}
          value={formik.values.specializations?.[index]?.grade}
          name={`specializations.${index}.grade`}
          options={gradesOptions}
          onChange={formik.handleChange}
          error={
            formik.touched.specializations?.[index]?.grade &&
            Boolean(formik.errors.specializations?.[index]?.grade)
          }
        />
        <TextField
          size={"small"}
          name={`specializations.${index}.licenseNumber`}
          label={"License Number"}
          value={formik.values.specializations?.[index]?.licenseNumber}
          onChange={formik.handleChange}
          // error={formik.touched.specializations?.[index]?.licenseNumber && Boolean(formik.errors.specializations?.[index]?.licenseNumber)}
        />
        {onRemove && (
          <IconButton size="small" onClickCapture={onRemove} aria-label="more">
            <TrashIcon />
          </IconButton>
        )}
      </div>
    </div>
  );
};

export default SpecializationField;
