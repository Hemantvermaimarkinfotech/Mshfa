import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import LabtestTable from "../components/LabtestTable";
import { TitledBlock } from "components/layout";
import { useConfig } from "hooks/config";
import { LabTestField, CheckboxField } from "components/forms";
import { useErrorMessage } from "hooks/formErrorMessage";
import { CSVUploader } from "components/common";

const LabTest = ({ errors }) => {
  const formik = useFormikContext();
  const [allLabtest, setAllLabtest] = useState(formik?.values?.labTests);
  const [showDropDown, setShowDropDown] = useState(true);
  const [testsFile, setTestsFile] = useState([]);
  const { tests } = useConfig();
  useErrorMessage(errors);
  
   const labtestSelect = formik.values.allLabTests;

  useEffect(() => {
    if (labtestSelect) {
      setShowDropDown(false);
      formik.setFieldValue("allLabTests", true);
      formik.setFieldValue("labTests", []);
    } else {
      setShowDropDown(true);
    }
  }, [labtestSelect]);

  useEffect(() => {
    // Filter before send
    const filtered = allLabtest.filter((v) => v !== undefined);
    formik.setFieldValue("labTests", filtered);
  }, [allLabtest]);

  useEffect(() => {
    // File upload input
    if (testsFile && testsFile.length > 0) {
      // Clean csv file
      let resultUploaded = testsFile
        ?.filter((e) => e.id !== "")
        .map(function (o) {
          return Object.fromEntries(
            Object.entries(o)?.map(([key, value]) => [
              key?.trim(),
              value?.replaceAll("\r", ""),
            ])
          );
        });
      resultUploaded.forEach((v) => (v.id = Number(v.id)));
      resultUploaded.forEach((v) => (v.price = Number(v.price)));
      // Add input only if not in table
      for (var i = 0; i < resultUploaded.length; i++) {
        const value = resultUploaded[i];
        if (!allLabtest.some((el) => el.id == value.id)) {
          setAllLabtest((prev) => [...prev, value]);
        }
      }
    }
  }, [testsFile]);

  function getLabTestName(key, defaultValue = null) {
    const found = tests.find((v) => v.key == key);
    return !found ? defaultValue : found.val;
  }

  const deleteLabTest = (key) => {
    const LabTestDel = [...allLabtest].filter((value) => value !== undefined);
    LabTestDel.splice(key, 1);
    setAllLabtest(LabTestDel);
  };

  const columns = [
    {
      id: "name",
      label: "Name",
      minWidth: 170,
      align: "left",
    },
    { id: "newPrice", label: "New Price", minWidth: 50, align: "left" },
    { id: "oldPrice", label: "Old Price", minWidth: 50, align: "left" },
    { id: "delete", label: "Delete", minWidth: 50, align: "right" },
  ];

  function getOldPrice(key, defaultValue = null) {
    const found = tests.find((v) => v.key == key);
    return !found ? defaultValue : found.price ;
  }

  return (
    <>
      <div className="create-doctor-form__body">
        <div className="create-doctor-form__row">
          <TitledBlock title={"Lab Test"}>
            {/* <div className="create-doctor-form__row--twin   preferences-select">
              <CheckboxField
                title={"All Lab-Tests"}
                name={"allLabTests"}
                checked={formik.values.allLabTests}
                onChange={formik.handleChange}
              />
            </div> */}
          </TitledBlock>
        </div>
        {showDropDown && (
          <>
            <CSVUploader setCsvData={setTestsFile} csvData={testsFile} />
            <LabTestField
              allLabtest={allLabtest}
              allTests={tests}
              setAllLabtest={setAllLabtest}
              getOldPrice={getOldPrice}
            />

            {allLabtest.length > 0 && allLabtest && (
              <LabtestTable
                columns={columns}
                rows={allLabtest}
                handleDelete={deleteLabTest}
                handleName={getLabTestName}
                getOldPrice={getOldPrice}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default LabTest;