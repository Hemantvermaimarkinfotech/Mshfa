import React from "react";
import { useFormikContext } from "formik";
import { TitledBlock } from "components/layout";
import { READABLE_DATE_FORMAT } from "utils/date";
import { InputAdornment } from "@material-ui/core";
import { useErrorMessage } from "hooks/formErrorMessage";
import { TextField, DateInput } from "components/forms";

const Preferences = ({ errors }) => {
  const formik = useFormikContext();
  useErrorMessage(errors);

  return (
    <>
      <div className="create-coupon-form__body">
        <div className="create-doctor-form__row create-doctor-form__row--twin ">
          <TitledBlock title={"Package price"}>
            <TextField
              type={"number"}
              size={"small"}
              name={"price"}
              label={"Package Price"}
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">KD</InputAdornment>
                ),
              }}
            />
          </TitledBlock>

          <TitledBlock title={"Number of appointments"}>
            <TextField
              type={"number"}
              size={"small"}
              name={"numOfAppointments"}
              label={"Number of appointments"}
              value={formik.values.numOfAppointments}
              onChange={formik.handleChange}
              error={
                formik.touched.numOfAppointments &&
                Boolean(formik.errors.numOfAppointments)
              }
            />
          </TitledBlock>
        </div>

        <TitledBlock title={"Package Duration"}>
          <div className="duration-field__row">
            <DateInput
              label={"Activation Date"}
              name={"activationDate"}
              value={formik.values.activationDate}
              onChange={formik.handleChange}
              yearSelect={true}
              error={
                formik.touched.activationDate &&
                Boolean(formik.errors.activationDate)
              }
              dateFormat={READABLE_DATE_FORMAT}
            />
            <div className="duration-field__row">
              <DateInput
                label={"Expiration Date"}
                name={"expirationDate"}
                value={formik.values.expirationDate}
                onChange={formik.handleChange}
                yearSelect={true}
                error={
                  formik.touched.expirationDate &&
                  Boolean(formik.errors.expirationDate)
                }
                dateFormat={READABLE_DATE_FORMAT}
              />
            </div>
          </div>
        </TitledBlock>
      </div>
    </>
  );
};

export default Preferences;
