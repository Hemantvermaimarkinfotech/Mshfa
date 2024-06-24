import React, { useState, useEffect } from "react";
import { useFormikContext } from "formik";
import { CSVUploader } from "components/common";
import { useErrorMessage } from "hooks/formErrorMessage";
import { TitledBlock } from "components/layout";
import PatientsTable from "../components/PatientsTable";
import { useQuery } from "@apollo/client";
import { PatientAPI } from "api";
import { CheckboxField, AutocompleteInput } from "components/forms";

const Patients = ({ errors, isEditing }) => {
  const formik = useFormikContext();
  const patientSelect = formik.values.allPatients;
  const [query, setQuery] = useState("");
  const [emailsList, setEmailsList] = useState("");
  const { data: dataPatients } = useQuery(PatientAPI.getAllPatients(), {
    variables: { search: query },
  });

  const { data: patientList } = useQuery(PatientAPI.getPatientList(), {
    variables: { search: emailsList },
  });

  const [patientsEdge, setPatientsEdge] = useState([]);
  const [pats, setPats] = useState(formik?.values?.pat);
  const [patients, setPatients] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [showDropDown, setShowDropDown] = useState(true);
  const [addPatient, setAddPatient] = useState();
  const [fetchedPatients, setFetchedPatients] = useState(
    formik?.values?.patients
  );
  useErrorMessage(errors);

  useEffect(() => {
    // handle data in update
    if (isEditing && fetchedPatients.length > 0) {
      setPatientsEdge(fetchedPatients);
    }
    // handle data in create
    if (fetchedPatients !== undefined) {
      setPatientsEdge(fetchedPatients);
    }
  }, []);

  // Patients Conditions #1
  useEffect(() => {
    if (!patientSelect) {
      setShowDropDown(true);
    } else {
      setShowDropDown(false);
      formik.setFieldValue("allPatients", true);
      formik.setFieldValue("pat", []);
    }
  }, [patientSelect]);

  // Get patients data
  useEffect(() => {
    if (dataPatients?.patientList) {
      const generatePats = dataPatients.patientList.edges.map(({ node }) => ({
        key: node.patientId,
        val: `${node.firstName} ${node.lastName}`,
        email: node.email,
      }));
      setPatients(generatePats);
    }
  }, [dataPatients]);
   
  // Prevent add undefind by default
  useEffect(() => {
    if (typeof addPatient !== "undefined") {
      setPats((prev) => [...prev, addPatient]);
    }
  }, [addPatient]);

  // Set Patients to send
  useEffect(() => {
    // fix the update
    if (patientsEdge.length > 0) {
      formik.setFieldValue("patients", patientsEdge);
    }
    formik.setFieldValue("pat", pats);
  }, [pats]);

  // Handle uploaded file
  useEffect(() => {
    let getEmails = csvData
      .map((obj) => obj.email)
      .filter((element) => element);

    const commaSeparated = getEmails.join(",");
    setEmailsList(commaSeparated);
  }, [csvData]);

  useEffect(() => {
    if (emailsList !== "" && patientList !== undefined) {
      const ids = patientList.patientListByEmails.edges.map(
        (edge) => edge.node.patientId
      );
      for (const value of ids) {
        if (!patientsEdge.some((el) => el.patientId === value)) {
          setPats((prev) => [...prev, value]);
          setPatientsEdge((prev = []) => [
            ...prev,
            {
              patientId: value,
              firstName: getCurrentPatient(value)?.firstName,
              lastName: getCurrentPatient(value)?.lastName,
              email: getCurrentPatient(value)?.email,
            },
          ]);
        }
      }
    }
  }, [patientList]);

  const deletePatient = (key) => {
    // old
    setPats(pats.filter((x) => x !== key));
    // new
    setPatientsEdge(patientsEdge.filter(({ patientId }) => patientId !== key));
  };

  const columns = [
    { id: "name", label: "Name", minWidth: 170, align: "left" },
    { id: "email", label: "Email", minWidth: 50, align: "left" },
    { id: "delete", label: "Delete", minWidth: 50, align: "right" },
  ];

  function getCurrentPatient(key) {
    const emailEdges = patientList?.patientListByEmails.edges || [];
    const emailIndex = emailEdges.findIndex(
      (edge) => edge.node.patientId === key
    );
    if (emailIndex !== -1) {
      return emailEdges[emailIndex].node;
    }
  
    const patientEdges = dataPatients?.patientList.edges || [];
    const patientIndex = patientEdges.findIndex(
      (edge) => edge.node.patientId === key
    );
    if (patientIndex !== -1) {
      return patientEdges[patientIndex].node;
    }
  
    return null;
  }

  return (
    <>
      <div className="create-coupon-form__body">
        {/* All Patients */}
        <div className="patients-field">
          <TitledBlock title={"Coupon Beneficiaries"}>
            <div className="create-doctor-form__row--twin   preferences-select">
              <CheckboxField
                title={"All Patients"}
                name={"allPatients"}
                checked={formik.values.allPatients}
                onChange={formik.handleChange}
              />
            </div>
          </TitledBlock>
        </div>

        {showDropDown && (
          <>
            <CSVUploader setCsvData={setCsvData} csvData={csvData} />
            <AutocompleteInput
              blurOnSelect
              name={`pat`}
              label={"Patients"}
              inputValue={query}
              options={patients}
              onChange={(e) => {
                if (
                  !patientsEdge.some((el) => el.patientId === e.target.value)
                ) {
                  setAddPatient(e.target.value);
                  setPatientsEdge((prev = []) => [
                    ...prev,
                    {
                      patientId: e.target.value,
                      firstName: getCurrentPatient(e.target.value)?.firstName,
                      lastName: getCurrentPatient(e.target.value)?.lastName,
                      email: getCurrentPatient(e.target.value)?.email,
                    },
                  ]);
                }
                setQuery("");
              }}
              onInputChange={(e, inputValue) => {
                setQuery(inputValue);
              }}
              value={formik?.values?.pat}
              error={formik.touched.pat && Boolean(formik.errors.pat)}
            />

            <br />
            {patientsEdge && patientsEdge.length > 0 && (
              <PatientsTable
                columns={columns}
                rows={patientsEdge}
                handleDelete={deletePatient}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Patients;
