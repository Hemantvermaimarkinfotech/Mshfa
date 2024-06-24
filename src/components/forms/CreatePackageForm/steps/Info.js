import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { TextField, AutocompleteInput } from "components/forms";
import { TitledBlock } from "components/layout";
import { useErrorMessage } from "hooks/formErrorMessage";
import { DoctorAPI } from "api";
import { useQuery } from "@apollo/client";

const Info = ({ errors, isEditing }) => {
  const formik = useFormikContext();
  const [doctors, setDoctors] = useState([]);
  const [query, setQuery] = useState("");
  const { data: dataDoctors } = useQuery(DoctorAPI.getAllDoctors(), {
    variables: { search: query },
  });

  useErrorMessage(errors);

  // Get doctors data
  useEffect(() => {
    if (dataDoctors?.doctorList?.edges) {
      const generateAllDocs = dataDoctors.doctorList.edges.map(({ node }) => ({
        key: node.id,
        val: `${node.firstName} ${node.lastName}`,
        model: node.workModel.key,
      }));
      const filteredDoctors = generateAllDocs.filter(
        (doctor) => doctor.model == "1"
      );
      setDoctors(filteredDoctors);
      //setScheduledDoctors(generateAllDocs.filter(({ model }) => model === "1"));
    }
  }, [dataDoctors]);

  return (
    <>
      <div className="create-coupon-form__body">
        <TitledBlock title={"Package Info"} />
        <div className="create-doctor-form__row create-doctor-form__row--twin ">
          <TextField
            size={"small"}
            name={"title"}
            label={"English Title"}
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
          />
          <TextField
            size={"small"}
            name={"titleAr"}
            label={"Arabic Title"}
            value={formik.values.titleAr}
            onChange={formik.handleChange}
            error={formik.touched.titleAr && Boolean(formik.errors.titleAr)}
          />
        </div>
        <TitledBlock title={"Package description"}>
          <div className="create-doctor-form__row create-doctor-form__row--twin ">
            <TextField
              multiline
              size={"small"}
              name={`description`}
              label={"English description"}
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
            />
            <TextField
              multiline
              size={"small"}
              name={`descriptionAr`}
              label={"Arabic description"}
              value={formik.values.descriptionAr}
              onChange={formik.handleChange}
              error={
                formik.touched.descriptionAr &&
                Boolean(formik.errors.descriptionAr)
              }
            />
          </div>
        </TitledBlock>
        <div className="create-doctor-form__row">
          <TitledBlock title={"Doctor"}>
            <AutocompleteInput
              blurOnSelect
              name={`doctorId`}
              label={"Doctor id"}
              options={doctors}
              onChange={formik.handleChange}
              inputValue={query}
              value={formik?.values?.doctorId}
              onInputChange={(e, inputValue) => {
                setQuery(inputValue);
              }}
              error={formik.touched.doctorId && Boolean(formik.errors.doctorId)}
            />
          </TitledBlock>
        </div>
      </div>
    </>
  );
};

export default Info;
