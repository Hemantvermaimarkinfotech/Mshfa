import "./index.scss";

import React, { useEffect, useMemo } from "react";
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
import { CreateClinicForm } from "components/forms";
import { useClinic, useClinicsAPI } from "hooks/clinics";
import { GlobalAppRouter } from "routes";

const EditClinicPage = ({ route }) => {
  const title = route.meta?.title;
  const redirect = useReactiveVar(state.clinicProfileRedirect);
  const history = useHistory();
  const { id } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { clinic, clinicLoading, clinicError, refetch } = useClinic(id);
  const { updateClinic } = useClinicsAPI();

  useEffect(() => {
    refetch();
  }, []);

  const preparedValues = useMemo(() => {
    if (!clinic) return null;

    const { __typename, title, titleAr, logo, status, id, ...rest } = clinic;

    const isActive = status === "ACTIVE" ? true : false;

    return {
      title: title,
      titleAr: titleAr,
      id: clinic.id,
      status: isActive,
      logo,
      ...rest,
    };
  }, [clinic]);

  if (clinicLoading) {
    return <GlobalLoader />;
  }
  if (clinicError) {
    return <GlobalError />;
  }

  const handleSubmit = (data) => {
    const { activatedDate, deactivatedDate, ...rest } = data;
    return updateClinic(rest)
      .then((response) => {
        if (response) {
          if (response.success) {
            let key = enqueueSnackbar("Clinic saved", {
              onClick: () => {
                closeSnackbar(key);
              },
            });
            if (redirect) history.push(redirect);
            else history.push(GlobalAppRouter.paths.clinics);
          } else {
            enqueueSnackbar("Error while updating clinic", {
              variant: "error",
            });
            return response;
          }
        }
      })
      .catch((e) =>
        enqueueSnackbar("Error while updating clinic", { variant: "error" })
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
        <CreateClinicForm
          isEditing={true}
          onSubmit={handleSubmit}
          initialValues={preparedValues}
        />
      </Paper>
    </div>
  );
};

export default EditClinicPage;
