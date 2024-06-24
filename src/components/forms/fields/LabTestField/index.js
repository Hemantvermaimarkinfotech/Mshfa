import "./index.scss";

import React, { useEffect } from "react";
import { useFormikContext } from "formik";
import { TextField } from "components/forms/index";
import { AutocompleteInput } from "components/forms";
import { InputAdornment } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { SecondaryButton } from "components/layout/buttons";
import { useSnackbar } from "notistack";

const LabTestField = ({ allLabtest, getOldPrice, setAllLabtest, allTests }) => {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormikContext();

  const newPrice = formik.values.labtestNewPrice;
  const Name = formik.values.labtestName;

  const handleAddTest = () => {
    const oldPrice = getOldPrice(Name);
    if (Name && newPrice && oldPrice >= newPrice) {
      const newLabtest = {
        id: Number(Name),
        price: Number(newPrice),
      };
      // Add input only if not in table
      if (!allLabtest.some((el) => el.id === newLabtest.id)) {
        setAllLabtest((prev) => [...prev, newLabtest]);
      }
    } else if (newPrice > oldPrice) {
      enqueueSnackbar("New price must be less or equal old price", {
        variant: "error",
      });
    }
  };

  useEffect(() => {
    formik.setFieldValue("labtestOldPrice", getOldPrice(Name));
  }, [Name]);

  return (
    <div className={"specialization-field"}>
      <div className="specialization-field__row specialization-field__row--semi">
        <AutocompleteInput
          blurOnSelect
          name={`labtestName`}
          label={"Test name"}
          options={allTests}
          onChange={formik.handleChange}
          value={formik.values.labtestName}
          error={
            formik.touched.labtestName && Boolean(formik.errors.labtestName)
          }
        />
        <TextField
          type={"number"}
          size={"small"}
          name={"labtestOldPrice"}
          label={"Old Price"}
          disabled={true}
          value={formik.values.labtestOldPrice}
          onChange={formik.handleChange}
          error={formik.touched.labtestOldPrice}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">KD</InputAdornment>
            ),
          }}
        />
        <TextField
          type={"number"}
          size={"small"}
          name={"labtestNewPrice"}
          label={"New Price"}
          value={formik.values.labtestNewPrice}
          onChange={formik.handleChange}
          error={formik.touched.labtestNewPrice}
          onKeyPress={(event) => {
            if (event?.key === "-" || event?.key === "+") {
              event.preventDefault();
            }
          }}
          InputProps={{
            min: 0,
            type: "text",
            pattern: "[0-9]+",
            allowNegative: false,
            startAdornment: (
              <InputAdornment position="start">KD</InputAdornment>
            ),
          }}
        />
        <SecondaryButton icon={<Add />} onClick={handleAddTest} />
      </div>
    </div>
  );
};

export default LabTestField;
