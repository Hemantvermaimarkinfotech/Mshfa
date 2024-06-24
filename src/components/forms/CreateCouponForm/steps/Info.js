import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import {
  TextField,
  CheckboxField,
  RadioGroupField,
  AutocompleteInput,
} from "components/forms";
import { useQuery } from "@apollo/client";
import { DoctorAPI } from "api";
import { Chip } from "@material-ui/core";
import { TitledBlock } from "components/layout";
import { useErrorMessage } from "hooks/formErrorMessage";
import { serviceType, homeService } from "utils/common";

const Info = ({ errors, isEditing }) => {
  const formik = useFormikContext();
  const [query, setQuery] = useState("");
  const { data: dataDoctors } = useQuery(DoctorAPI.getAllDoctors(), {
    variables: { search: query },
  });
  const [showHomeService, setShowHomeService] = useState(false);
  const [doctorsEdge, setDoctorsEdge] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [docs, setDocs] = useState(formik?.values?.doc);
  const [showDocSection, setShowDocSection] = useState(false);
  const [scheduledDoctors, setScheduledDoctors] = useState();

  const [showDocSelector, setShowDocSelector] = useState(false);
  const [addDoctor, setAddDoctor] = useState();
  const [fetchedDoctors, setFetchedDoctors] = useState(formik?.values?.doctors);
  useErrorMessage(errors);

  // Handle Services Type
  const serviceSelect = formik.values.serviceType;
  const doctorSelect = formik.values.allDoctors;
  const allServiceSelect = formik.values.allServices;
  const empty = [];

  useEffect(() => {
    // handle data in update
    if (isEditing && fetchedDoctors.length > 0) {
      setDoctorsEdge(fetchedDoctors);
    }
    // handle data in create
    if (fetchedDoctors !== undefined) {
      setDoctorsEdge(fetchedDoctors);
    }
  }, []);

  // Get doctors data
  useEffect(() => {
    if (dataDoctors?.doctorList?.edges) {
      const generateAllDocs = dataDoctors.doctorList.edges.map(({ node }) => ({
        key: node.doctorId,
        val: `${node.firstName} ${node.lastName}`,
        model: node.workModel.key,
      }));
      setDoctors(generateAllDocs);
      setScheduledDoctors(generateAllDocs.filter(({ model }) => model === "1"));
    }
  }, [dataDoctors]);

  // Prevent add undefind by default
  useEffect(() => {
    if (typeof addDoctor !== "undefined") {
      setDocs((prev) => [...prev, addDoctor]);
    }
  }, [addDoctor]);

  // Set Doctors to send
  useEffect(() => {
    // fix the update
    if (doctorsEdge.length > 0) {
      formik.setFieldValue("doctors", doctorsEdge);
    }
    formik.setFieldValue("doc", docs);
  }, [docs]);

  // Services Conditions #1
  useEffect(() => {
    if (doctorSelect) {
      setShowDocSelector(false);
      formik.setFieldValue("allDoctors", true);
      formik.setFieldValue("doc", empty);
    } else {
      setShowDocSelector(true);
    }
  }, [doctorSelect]);

  // Services Conditions #2
  useEffect(() => {
    if (serviceSelect == "0") {
      setShowDocSection(true);
    }

    if (serviceSelect === "1" || serviceSelect === "5") {
      setShowDocSection(false);
      formik.setFieldValue("allDoctors", false);
    }
    if (serviceSelect === "2" || serviceSelect === "3") {
      setShowDocSection(true);
    }

    if (serviceSelect) {
      formik.setFieldValue("allServices", false);
    }

    if (serviceSelect === "5") {
      setShowHomeService(true);
      setShowDocSection(false);
    } else {
      setShowHomeService(false);
      formik.setFieldValue("homeServiceSetup", 2);
    }
  }, [serviceSelect]);

  // Services Conditions #3
  useEffect(() => {
    if (allServiceSelect) {
      const isEmpty = undefined;
      formik.setFieldValue("allServices", true);
      formik.setFieldValue("serviceType", isEmpty);
      setShowDocSection(false);
      setShowHomeService(false);
    } else if (
      (!allServiceSelect && serviceSelect === "1") ||
      serviceSelect === "5"
    ) {
      setShowDocSection(false);
      formik.setFieldValue("allServices", false);
    } else {
      setShowDocSection(true);
    }
  }, [allServiceSelect]);

  const deleteDoctor = (key) => {
    // old
    setDocs(docs.filter((x) => x !== key));
    // new
    setDoctorsEdge(doctorsEdge.filter(({ doctorId }) => doctorId !== key));
  };

  function getCurrentDoctor(key) {
    return (
      dataDoctors.doctorList.edges.filter(
        (edge) => edge.node.doctorId === key
      )?.[0]?.node ?? null
    );
  }

  return (
    <>
      <div className="create-coupon-form__body">
        <TitledBlock title={"Coupon Info"} />
        <div className="create-doctor-form__row create-doctor-form__row--twin ">
          <TextField
            size={"small"}
            name={"couponName"}
            label={"Coupon Name"}
            value={formik.values.couponName}
            onChange={formik.handleChange}
            error={
              formik.touched.couponName && Boolean(formik.errors.couponName)
            }
          />
          <TextField
            size={"small"}
            name={"couponCode"}
            label={"Coupon Code"}
            value={formik.values.couponCode}
            onChange={formik.handleChange}
            inputProps={{ style: { textTransform: "uppercase" } }}
            error={
              formik.touched.couponCode && Boolean(formik.errors.couponCode)
            }
          />
        </div>

        <TitledBlock title={"Services"} />
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

        {showHomeService && (
          <>
            <TitledBlock title={"Home Service"} />
            <div className="create-coupon-form__row  ">
              <RadioGroupField
                checked={formik.values.homeServiceSetup}
                size={"small"}
                options={homeService}
                value={formik.values.homeServiceSetup}
                name={`homeServiceSetup`}
                onChange={formik.handleChange}
              />
            </div>
          </>
        )}

        <div className="create-doctor-form__row--twin   preferences-select">
          <CheckboxField
            title={"All Services"}
            name={"allServices"}
            checked={formik.values.allServices}
            onChange={formik.handleChange}
          />
        </div>
        <br />
        {/* All Doctors */}
        {showDocSection && (
          <>
            <div className="preferences-field">
              <TitledBlock title={"Coupon for doctor"}>
                <div className="create-doctor-form__row--twin   preferences-select">
                  <CheckboxField
                    title={"All Doctors"}
                    name={"allDoctors"}
                    checked={formik.values.allDoctors}
                    onChange={formik.handleChange}
                  />
                </div>
              </TitledBlock>
            </div>
            {showDocSelector && (
              <>
                <AutocompleteInput
                  blurOnSelect
                  name={`doc`}
                  label={"Doctors"}
                  inputValue={query}
                  options={serviceSelect == 0 ? scheduledDoctors : doctors}
                  onChange={(e) => {
                    if (
                      !doctorsEdge.some((el) => el.doctorId === e.target.value)
                    ) {
                      setAddDoctor(e.target.value);
                      setDoctorsEdge((prev = []) => [
                        ...prev,
                        {
                          doctorId: e.target.value,
                          firstName: getCurrentDoctor(e.target.value)
                            ?.firstName,
                          lastName: getCurrentDoctor(e.target.value)?.lastName,
                        },
                      ]);
                    }
                    setQuery("");
                  }}
                  onInputChange={(e, inputValue) => {
                    setQuery(inputValue);
                  }}
                  value={formik?.values?.doc}
                  error={formik.touched.doc && Boolean(formik.errors.doc)}
                />

                <div className="users-values">
                  {doctorsEdge &&
                    doctorsEdge.map(
                      ({ firstName, lastName, doctorId }, index) => (
                        <Chip
                          key={`doc-${index}`}
                          label={`${firstName} ${lastName}`}
                          onDelete={() => deleteDoctor(doctorId)}
                        />
                      )
                    )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Info;
