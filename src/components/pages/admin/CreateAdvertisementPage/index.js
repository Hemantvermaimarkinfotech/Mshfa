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
import CreateAdvertisementForm from "components/forms/CreateAdvertisementForm";
import { useAdvertisementAPI } from "hooks/advertisement";

import { GlobalAppRouter } from "routes";

const CreateAdvertisementPage = ({ route }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const title = route.meta?.title;

  const { createAdvertisement } = useAdvertisementAPI();
  const history = useHistory();

  const handleSubmit = (data) => {
    return createAdvertisement(data)
      .then((response) => {
        console.log('Advertisement : ', response)
        if (response) {
          if (response.success) {
            let key = enqueueSnackbar("Advertisement created", {
              onClick: () => {
                closeSnackbar(key);
              },
            });
            history.push(GlobalAppRouter.paths.advertisement);
          } else {
            enqueueSnackbar("Error while creating Advertisement", {
              variant: "error",
            });
          }
          return response;
        }
      })
      .catch((e) => {
       enqueueSnackbar("Error while creating Advertisement", { variant: "error" });
        // enqueueSnackbar(e?.message, { variant: "error" });
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
      <CreateAdvertisementForm onSubmit={handleSubmit} />
      </Paper>
    </div>
  );
};

export default CreateAdvertisementPage;
