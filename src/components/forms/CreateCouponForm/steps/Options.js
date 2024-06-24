import React, { useMemo, useEffect } from "react";
import { useFormikContext } from "formik";
import { useErrorMessage } from "hooks/formErrorMessage";
import {
  CheckboxField,
  SelectInput,
  TextField,
  DateInput,
} from "components/forms/index";
import { TitledBlock } from "components/layout";
import moment from "moment";
import { READABLE_DATE_FORMAT } from "utils/date";
import { createHoursArray } from "utils/common";

const Options = ({ isEditing = false, errors }) => {
  useErrorMessage(errors);
  const formik = useFormikContext();

  const times = useMemo(() => {
    return createHoursArray();
  }, [createHoursArray]);

  // Format Date & Time
  const endDate = formik.values.toDate + " " + formik.values.toTime;
  const startDate = formik?.values?.fromDate + " " + formik?.values?.fromTime;

  useEffect(() => {
    //convert for validation
    const { fromDate, fromTime, toDate, toTime } = formik.values;

    if (
      [fromDate, fromTime, toDate, toTime].some(
        (value) => typeof value === "undefined"
      )
    ) {
      formik.setValues({
        ...formik.values,
        fromDate: null,
        fromTime: null,
        toDate: null,
        toTime: null,
      });
    }

    if (isEditing && moment(formik.values.startDate).isValid()) {
      const fromTime = moment(formik.values.startDate).format("HH:mm:ss");
      const fromDate = moment(formik.values.startDate).format("YYYY-MM-DD");
      formik.setValues({
        ...formik.values,
        fromTime,
        fromDate,
      });
    }
  }, []);

  useEffect(() => {
    if (isEditing) {
      //convert endDate when update
      if (moment(formik.values.endDate).isValid()) {
        const toTime = moment(formik.values.endDate).format("HH:mm:ss");
        const toDate = moment(formik.values.endDate).format("YYYY-MM-DD");
        formik.setFieldValue("toTime", toTime);
        formik.setFieldValue("toDate", toDate);
      }
    }
  }, []);


  useEffect(() => {
    //in create
    if (formik?.values?.fromTime && formik?.values?.fromDate) {
      formik.setFieldValue("startDate", new Date(startDate).toISOString());
    }
  }, [startDate]);

  useEffect(() => {
    //in create
    if (formik?.values?.toTime && formik?.values?.toDate) {
      formik.setFieldValue("endDate", new Date(endDate).toISOString());
    }
  }, [endDate]);

  return (
    <>
      <div className="create-doctor-form__body">
        <TitledBlock title={"Coupon Duration"} />
        <div className="duration-field__row">
          <DateInput
            label={"Start Date"}
            name={"fromDate"}
            value={formik.values.fromDate}
            onChange={formik.handleChange}
            yearSelect={true}
            error={formik.touched.fromDate && Boolean(formik.errors.fromDate)}
            dateFormat={READABLE_DATE_FORMAT}
          />
          <div className="duration-field__row">
            <SelectInput
              label={"From"}
              name={"fromTime"}
              value={formik.values.fromTime}
              options={times}
              centeredTo={"09:00:00"}
              onChange={formik.handleChange}
              error={formik.touched.fromTime && Boolean(formik.errors.fromTime)}
            />
          </div>
        </div>

        <div className="duration-field__row">
          <DateInput
            label={"Expiry Date"}
            name={"toDate"}
            value={formik.values.toDate}
            onChange={formik.handleChange}
            yearSelect={true}
            error={formik.touched.toDate && Boolean(formik.errors.toDate)}
            dateFormat={READABLE_DATE_FORMAT}
          />
          <div className="duration-field__row">
            <SelectInput
              label={"To"}
              name={"toTime"}
              value={formik.values.toTime}
              options={times}
              centeredTo={"10:00:00"}
              onChange={formik.handleChange}
              error={formik.touched.toTime && Boolean(formik.errors.toTime)}
            />
          </div>
        </div>
        <div className="preferences-field">
          <TitledBlock title={"Max Coupon Usage"}>
            <div className="create-doctor-form__row--twin amount-field">
              <TextField
                type={"number"}
                size={"small"}
                name={"maxNoRedeem"}
                label={"Max Usage"}
                value={formik.values.maxNoRedeem}
                onChange={formik.handleChange}
                error={
                  formik.touched.maxNoRedeem &&
                  Boolean(formik.errors.maxNoRedeem)
                }
              />
            </div>
          </TitledBlock>
        </div>
        <div className="preferences-field">
          <TitledBlock title={"Coupon Status"}>
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
export default Options;
