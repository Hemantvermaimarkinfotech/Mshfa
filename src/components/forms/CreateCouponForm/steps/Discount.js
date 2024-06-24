import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { RadioGroupField, TextField } from "components/forms/index";
import { InputAdornment } from "@material-ui/core";
import { discountType } from "utils/common";
import { TitledBlock } from "components/layout";
import { useErrorMessage } from "hooks/formErrorMessage";

const Discount = ({ errors, isEditing }) => {
  const [select, setSelect] = useState({
    key: "0",
  });

  const formik = useFormikContext();
  useErrorMessage(errors);
  const percentage = parseFloat(formik.values.discountPercentage);
  const maxDiscount = parseFloat(formik.values.maxDiscountAmount);

  const handleChange = (event) => {
    setSelect({ key: event.target.value });
    formik.setFieldValue("percentFixed", event.target.value);
    if (event.target.value == "0") {
      formik.setFieldValue("discountPercentage", 0);
      formik.setFieldValue("maxDiscountAmount", 0);
    } else {
      formik.setFieldValue("fixedAmount", 0);
    }
  };

  // Select percentage tab if not empty
  useEffect(() => {
    debugger;
    if (isEditing && percentage !== null && maxDiscount !== 0) {
      setSelect({ key: "1" });
    } else {
      setSelect({ key: "0" });
    }
  }, []);

  return (
    <>
      <div className="create-doctor-form__body">
        <div className="create-doctor-form__row">
          <TitledBlock title={"Discount Type"}>
            <div className="create-doctor-form__row">
              <RadioGroupField
                size={"small"}
                options={discountType}
                value={select.key}
                onChange={handleChange}
              />
            </div>
          </TitledBlock>
        </div>

        <div className="create-doctor-form__row">
          <TitledBlock title={"Discount Amount"}>
            {select.key == "0" ? (
              <div className="create-doctor-form__row--twin amount-field">
                <TextField
                  type={"number"}
                  size={"small"}
                  name={"fixedAmount"}
                  label={"Discount Amount"}
                  value={formik.values.fixedAmount}
                  onChange={formik.handleChange}
                  error={formik.touched.fixedAmount}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">KD</InputAdornment>
                    ),
                  }}
                />
              </div>
            ) : (
              <div className="create-doctor-form__row--twin amount-field">
                <TextField
                  type={"number"}
                  size={"small"}
                  name={"discountPercentage"}
                  label={"Discount Percentage"}
                  value={formik.values.discountPercentage}
                  onChange={formik.handleChange}
                  error={formik.touched.discountPercentage}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">%</InputAdornment>
                    ),
                  }}
                />
              </div>
            )}
          </TitledBlock>
          {select.key == "1" ? (
            <TitledBlock title={"Max Discount Amount"}>
              <div className="create-doctor-form__row--twin amount-field">
                <TextField
                  type={"number"}
                  size={"small"}
                  name={"maxDiscountAmount"}
                  label={"Amount"}
                  value={formik.values.maxDiscountAmount}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.maxDiscountAmount &&
                    Boolean(formik.errors.maxDiscountAmount)
                  }
                />
              </div>
            </TitledBlock>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Discount;
