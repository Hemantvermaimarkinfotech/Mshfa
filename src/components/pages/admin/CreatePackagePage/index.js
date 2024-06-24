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
import { CreatePackageForm } from "components/forms";
import { usePackagesApi } from "hooks/packages";

import { GlobalAppRouter } from "routes";

const CreatePackagePage = ({ route }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const title = route.meta?.title;

  const { createPackage } = usePackagesApi();
  const history = useHistory();

  const handleSubmit = (data) => {
    console.log(data,'submited?')
    return createPackage(data)
      .then((response) => {
        if (response) {
          if (response.success) {
            let key = enqueueSnackbar("Package created", {
              onClick: () => {
                closeSnackbar(key);
              },
            });
            history.push(GlobalAppRouter.paths.packages);
          } else {
            enqueueSnackbar("Error while creating Package", {
              variant: "error",
            });
          }
          return response;
        }
      })
      .catch((e) => {
       enqueueSnackbar("Error while creating package", { variant: "error" });
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
        <CreatePackageForm onSubmit={handleSubmit} />
      </Paper>
    </div>
  );
};

export default CreatePackagePage;
