import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { useErrorMessage } from "hooks/formErrorMessage";
import {
  SelectInput,
  RadioGroupField,
  CheckboxField,
} from "components/forms/index";
import { TitledBlock } from "components/layout";
import { TextField } from "components/forms";
import { DoctorAPI } from "api";
import { useQuery } from "@apollo/client";
import { createToOpenArray } from "utils/common";

const Options = ({ errors }) => {
  const { data: dataDoctors } = useQuery(DoctorAPI.getAllDoctors());
  console.log('manik',dataDoctors)
  const [doctors, setDoctors] = useState([]);

  useErrorMessage(errors);
  const formik = useFormikContext();
  const isInteractive = formik.values.isInteractive;
  const toOpen = formik.values.toOpen;

  // Get doctors data
  useEffect(() => {
    if (dataDoctors?.doctorList) {
      const generateAllDocs = dataDoctors.doctorList.edges.map((edge) => ({
        key: edge.node.id,
        val: `${edge.node.firstName} ${edge.node.lastName}`,
        model: edge.node.workModel.key,
      }));
      const generateScheduledDocs = generateAllDocs.filter(
        (doc) => doc.model === "1"
      );
      setDoctors(generateAllDocs);
    }
  }, [dataDoctors]);

  useEffect(() => {
    if (toOpen !== "1") {
      formik.setFieldValue("doctorId", null);
    }
  }, [toOpen]);

  // service types
  const serviceType = [
    {
      key: "1",
      val: "New appointment",
    },
    {
      key: "2",
      val: "Followup appointment",
    },
  ];

  return (
    <>
      <div className="create-doctor-form__body">

        <TitledBlock title={"Client Url"} />
        <div className="create-doctor-form__row create-doctor-form__row--twin ">
          <TextField
            size={"small"}
            name={"clientUrl"}
            label={"Client Url"}
            value={formik.values.clientUrl}
            onChange={formik.handleChange}
            error={formik.touched.clientUrl && Boolean(formik.errors.clientUrl)}
          />
        </div>


        <div className="preferences-field">
          <TitledBlock title={"Interactive advertisement"}>
            <div className="create-doctor-form__row--twin preferences-select">
              <CheckboxField
                title={"Interactive"}
                name={"isInteractive"}
                checked={formik.values.isInteractive}
                onChange={formik.handleChange}
              />
            </div>
          </TitledBlock>
        </div>


        {isInteractive && (
          <div className="preferences-field">
            <TitledBlock title={"Open to"}>
              <div className="openTo-field__row">
                <SelectInput
                  label={"Open to"}
                  name={"toOpen"}
                  value={formik.values.toOpen}
                  options={createToOpenArray}
                  onChange={formik.handleChange}
                  error={formik.touched.toOpen && Boolean(formik.errors.toOpen)}
                />
              </div>
            </TitledBlock>
          </div>
        )}

        {/* choose doctor */}
        {isInteractive && toOpen == 1 && (
          <>
            <div className="preferences-field">
              <TitledBlock title={"Select doctor"}>
                <div className="openTo-field__row">
                  <SelectInput
                    label={"Select doctor"}
                    name={"doctorId"}
                    value={formik.values.doctorId}
                    options={doctors}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.doctorId && Boolean(formik.errors.doctorId)
                    }
                  />
                </div>
              </TitledBlock>
            </div>
            <br />
            <TitledBlock title={"Service Type"} />
            <div className="create-coupon-form__row">
              <RadioGroupField
                checked={formik.values.serviceType}
                size={"small"}
                options={serviceType}
                value={formik.values.serviceType}
                name={`serviceType`}
                onChange={formik.handleChange}
              />
            </div>
          </>
        )}

        {isInteractive && (toOpen == 1 || toOpen == 3) && (
          <div className="preferences-field">
            <TitledBlock title={"Is Package"}>
              <div className="create-doctor-form__row--twin preferences-select">
                <CheckboxField
                  title={"IsPackage"}
                  name={"isPackage"}
                  checked={formik.values.isPackage}
                  onChange={formik.handleChange}
                />
              </div>
            </TitledBlock>
          </div>
        )}
      </div>
    </>
  );
};
export default Options;
