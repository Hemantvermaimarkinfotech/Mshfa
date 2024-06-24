import "./index.scss";

import React from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  Paper,
  PageHeader,
  PageTitle,
  PageMetadata,
  Breadcrumbs,
} from "components/layout";
import { CreateClinicForm } from "components/forms";
import { useClinicsAPI } from "hooks/clinics";

import { GlobalAppRouter } from "routes";

const CreateClinicPage = ({ route }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const title = route.meta?.title;

  const { createClinic } = useClinicsAPI();
  const history = useHistory();

  const handleSubmit = (data) => {
    return createClinic(data)
      .then((response) => {
        if (response) {
          if (response.success) {
            let key = enqueueSnackbar("Clinic created", {
              onClick: () => {
                closeSnackbar(key);
              },
            });
            history.push(GlobalAppRouter.paths.clinics);
          } else {
            enqueueSnackbar("Error while creating Clinic", {
              variant: "error",
            });
          }
          return response;
        }
      })
      .catch((e) => {
       enqueueSnackbar("Error while creating clinic", { variant: "error" });
      });
  };

  return (
    <div
      className={"page page--thin page--blue page--scroll create-doctor-page"}
    >
      <PageHeader>
        <PageMetadata>
          <Breadcrumbs route={route} />
          <PageTitle title={title} />
        </PageMetadata>
      </PageHeader>
      <Paper>
        <CreateClinicForm onSubmit={handleSubmit} />
      </Paper>
    </div>
  );
};

export default CreateClinicPage;
