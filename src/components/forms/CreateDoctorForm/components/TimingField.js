import React from "react";
import { useFormikContext } from "formik";
import { TextField, SelectInput } from "components/forms/index";

function TimingField() {
  const formik = useFormikContext();

  const time = [
    { label: "Minute", value: "1" },
    { label: "Hour", value: "2" },
    { label: "Day", value: "3" },
  ];

  return (
    <>
      <div className="create-doctor-form__row create-doctor-form__row--twin ">
        <TextField
          size={"small"}
          type={"number"}
          label={"Book appointment"}
          name={`bookBefore`}
          value={formik.values.bookBefore}
          onChange={formik.handleChange}
          error={formik.touched.bookBefore && Boolean(formik.errors.bookBefore)}
        />
        <SelectInput
          label={"Type"}
          name={`bookBeforeType`}
          onChange={formik.handleChange}
          error={
            formik.touched.bookBeforeType &&
            Boolean(formik.errors.bookBeforeType)
          }
          options={time}
          value={formik.values.bookBeforeType}
        />
      </div>

      <div className="create-doctor-form__row create-doctor-form__row--twin ">
        <TextField
          size={"small"}
          type={"number"}
          label={"Cancel appointment"}
          name={`cancelBefore`}
          value={formik.values.cancelBefore}
          onChange={formik.handleChange}
          error={
            formik.touched.cancelBefore && Boolean(formik.errors.cancelBefore)
          }
        />

        <SelectInput
          label={"Type"}
          name={`cancelBeforeType`}
          onChange={formik.handleChange}
          error={
            formik.touched.cancelBeforeType &&
            Boolean(formik.errors.cancelBeforeType)
          }
          options={time}
          value={formik.values.cancelBeforeType}
        />
      </div>
    </>
  );
}

export default TimingField;
