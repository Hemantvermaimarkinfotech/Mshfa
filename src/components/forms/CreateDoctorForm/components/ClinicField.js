import React, { useEffect, useState } from "react";
import { ClinicsApi } from "api";
import { useFormikContext } from "formik";
import { AutocompleteInput } from "components/forms";
import { useQuery } from "@apollo/client";
import { Box } from "@material-ui/core";

function ClinicField() {
  const formik = useFormikContext();
  const [clinics, setClinics] = useState([]);

  const { data: allClinics } = useQuery(ClinicsApi.getAllClinics());

  // Get clinics data
  useEffect(() => {
    if (allClinics?.allClinics) {
      const clinics = allClinics.allClinics.edges.map((edge) => ({
        value: edge.node.id,
        label: edge.node.title,
        logo: edge.node.logo,
      }));
      setClinics(clinics);
    }
  }, [allClinics]);

  return (
    <div>
      <AutocompleteInput
        blurOnSelect
        name={`clinicId`}
        label={"Clinic"}
        options={clinics}
        onChange={formik.handleChange}
        value={formik.values.clinicId}
        getOptionLabel={(option) => option.label}
        error={formik.touched.clinicId && Boolean(formik.errors.clinicId)}
        renderOption={(option) => {
          return (
            <>
              <img style={{ width: 40 }} src={`${option.logo}`} />
              &nbsp;
              {option.label}
            </>
          );
        }}
      />
    </div>
  );
}

export default ClinicField;
