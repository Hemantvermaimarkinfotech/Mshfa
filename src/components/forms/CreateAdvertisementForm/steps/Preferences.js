import React, { useMemo, useEffect } from "react";
import { useFormikContext } from "formik";
import { TitledBlock } from "components/layout";
import { READABLE_DATE_FORMAT } from "utils/date";
import { createHoursArray } from "utils/common";
import { CheckboxField, SelectInput, DateInput } from "components/forms";
import { useErrorMessage } from "hooks/formErrorMessage";
import moment from "moment";
import { useUser } from "hooks/user";

const Preferences = ({ errors, isEditing }) => {
  const { user, userLoading, userError } = useUser();
  const formik = useFormikContext();
  useErrorMessage(errors);
  const times = useMemo(() => {
    return createHoursArray();
  }, [createHoursArray]);

  const expiryDateTime =
    formik?.values?.expireDate + " " + formik?.values?.expireTime;

  useEffect(() => {
    // convert for validation
    if (
      typeof formik.values.expireTime === "undefined" ||
      typeof formik.values.expireDate === "undefined"
    ) {
      formik.setFieldValue("expireDate", null);
      formik.setFieldValue("expireTime", null);
    }

    if (isEditing) {
      //convert expireDate when update
      if (moment(formik.values.expiryDateTime).isValid()) {
        const expireDate = moment(formik.values.expiryDateTime).format(
          "YYYY-MM-DD"
        );
        const expireTime = moment(formik.values.expiryDateTime).format(
          "HH:mm:ss"
        );
        formik.setFieldValue("expireDate", expireDate);
        formik.setFieldValue("expireTime", expireTime);
      }
    }
  }, []);

  useEffect(() => {
    //in create
    if (formik?.values?.expireTime && formik?.values?.expireDate) {
      formik.setFieldValue(
        "expiryDateTime",
        new Date(expiryDateTime).toISOString()
      );
    }
  }, [expiryDateTime]);
 
  return (
    <>
      <div className="create-coupon-form__body">
        <TitledBlock title={"Expiry Time"} />
        <div className="duration-field__row">
          <DateInput
            label={"Expire Date"}
            name={"expireDate"}
            value={formik.values.expireDate}
            onChange={formik.handleChange}
            yearSelect={true}
            error={
              formik.touched.expireDate && Boolean(formik.errors.expireDate)
            }
            dateFormat={READABLE_DATE_FORMAT}
          />
          <div className="duration-field__row">
            <SelectInput
              label={"Expire Time"}
              name={"expireTime"}
              value={formik.values.expireTime}
              options={times}
              centeredTo={"09:00:00"}
              onChange={formik.handleChange}
              error={
                formik.touched.expireTime && Boolean(formik.errors.expireTime)
              }
            />
          </div>
        </div>


        {user.role === "super admin" && (
          <div className="preferences-field">
            <TitledBlock title={"Approve ad"}>
              <div className="create-doctor-form__row--twin amount-field preferences-select">
                <CheckboxField
                  title={"Approve"}
                  name={"isApproved"}
                  checked={formik.values.isApproved}
                  onChange={formik.handleChange}
                />
              </div>
            </TitledBlock>
          </div>
        )}

        <div className="preferences-field">
          <TitledBlock title={"Activate ad"}>
            <div className="create-doctor-form__row--twin amount-field preferences-select">
              <CheckboxField
                title={"Activate"}
                name={"isActive"}
                checked={formik.values.isActive}
                onChange={formik.handleChange}
              />
            </div>
          </TitledBlock>
        </div>
      </div>
    </>
  );
};

export default Preferences;
