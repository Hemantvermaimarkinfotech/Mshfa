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
import { CreateAdForm } from "components/forms";
import { useAdsAPI } from "hooks/ads";

import { GlobalAppRouter } from "routes";

const CreateAdPage = ({ route }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const title = route.meta?.title;

  const { createAd } = useAdsAPI();
  const history = useHistory();

  const handleSubmit = (data) => {
    return createAd(data)
      .then((response) => {
        if (response) {
          if (response.success) {
            let key = enqueueSnackbar("Ad created", {
              onClick: () => {
                closeSnackbar(key);
              },
            });
            history.push(GlobalAppRouter.paths.ads);
          } else {
            enqueueSnackbar("Error while creating Ad", {
              variant: "error",
            });
          }
          return response;
        }
      })
      .catch((e) => {
       enqueueSnackbar("Error while creating ad", { variant: "error" });
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
        <CreateAdForm onSubmit={handleSubmit} />
      </Paper>
    </div>
  );
};

export default CreateAdPage;
