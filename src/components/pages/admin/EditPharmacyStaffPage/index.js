import "./index.scss";

import React, { useState, useEffect,useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useReactiveVar } from "@apollo/client";
import state from "apollo/state";

import {
  Paper,
  PageHeader,
  PageTitle,
  PageMetadata,
  Breadcrumbs,
  GlobalLoader,
  GlobalError,
} from "components/layout";
// import { CreateDoctorForm } from "components/forms";
import { CreatePharmacistStaffForm } from "components/forms";
// import { useDoctor, useDoctorAPI } from "hooks/doctors";
// import { usePharmacistAPI, usePharmacist } from "hooks/pharmacists";
import { usePharmacistStaffAPI, usePharmacistStaff } from "hooks/pharmacyStaff";
import { GlobalAppRouter } from "routes";

const EditPharmacyStaffPage = ({ route }) => {
  const title = route.meta?.title;
  const redirect = useReactiveVar(state.doctorProfileRedirect);
  const history = useHistory();
  const { id } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { pharmacistStaff, pharmacistStaffLoading, pharmacistStaffError } = usePharmacistStaff(id);
  const { updatePharmacistStaff } = usePharmacistStaffAPI();
 
  const preparedValues = useMemo(() => {
    if (!pharmacistStaff) return null;
    const {
      __typename,
      firstName,
      lastName,
      email,
      adminNotes,
      avatar,
      languages,
      gender,
      dob,
      phone,
    
      ...rest
    } = pharmacistStaff;
    console.log('aslfdhafoiudfvoidjh',pharmacistStaff.id)
    const mappedLanguages = languages
    ? languages.map((language) => ({
        key: language.key,
        val: language.val,  // Assuming language has a val property
      }))
    : [];
    return {
      id: pharmacistStaff.id, 
      firstName,
      lastName,
      email,
      adminNotes,
      languages: mappedLanguages,
      gender: gender?.key || "",
      dob,
      phone,
      avatar,
      ...rest,
    };
  }, [pharmacistStaff]);

  if (pharmacistStaffLoading) {
    return <GlobalLoader />;
  }
  if (pharmacistStaffError) {
    return <GlobalError />;
  }

  const handleSubmit = (data) => {
    const input = {
      id: pharmacistStaff.id,
      ...data,
    };
    return updatePharmacistStaff(input)
      .then((response) => {
        if (response) {
          if (response.success) {
            let key = enqueueSnackbar("Pharmacy Staff saved", {
              onClick: () => {
                closeSnackbar(key);
              },
            });
            if (redirect) history.push(GlobalAppRouter.paths.pharmacistStaff);
            else history.push(GlobalAppRouter.paths.pharmacistStaff);
          } else {
            enqueueSnackbar("Error while updating Pharmacy Staff", {
              variant: "error",
            });
            return response;
          }
        }
      })
      .catch((e) =>
        enqueueSnackbar("Error while updating Pharmacy Staff", { variant: "error" })
      );
  };

  return (
    <div className={"page page--thin page--blue page--scroll edit-doctor-page"}>
      <PageHeader>
        <PageMetadata>
          <Breadcrumbs route={route} params={{ id }} />
          <PageTitle title={title} />
        </PageMetadata>
      </PageHeader>
      <Paper>
        <CreatePharmacistStaffForm
          isEditing={true}
          onSubmit={handleSubmit}       
          initialValues={preparedValues}
          // workModel={workModel}
        />
      </Paper>
    </div>
  );
};

export default EditPharmacyStaffPage;
