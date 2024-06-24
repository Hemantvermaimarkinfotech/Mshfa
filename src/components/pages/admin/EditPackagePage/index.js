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
import { CreatePackageForm } from "components/forms";
import { usePackage, usePackagesApi } from "hooks/packages";
import { GlobalAppRouter } from "routes";

const EditPackagePage = ({ route }) => {
  const title = route.meta?.title;
  const redirect = useReactiveVar(state.packageProfileRedirect);
  const history = useHistory();
  const { id } = useParams();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { thePackage, packageLoading, packageError, refetch } = usePackage(id);

  const { updatePackage } = usePackagesApi();

  useEffect(() => {
    refetch();
  }, []);

  const preparedValues = useMemo(() => {
    if (!thePackage) return null;

    const {
      __typename,
      titleAr,
      title,
      descriptionAr,
      activationDate,
      description,
      price,
      numOfAppointments,
      doctor,
      expirationDate,
      id,
      ...rest
    } = thePackage;

    return {
      title: title,
      titleAr: titleAr,
      descriptionAr: descriptionAr,
      description: description,
      packageId: id,
      price: price,
      numOfAppointments: numOfAppointments,
      doctorId: doctor.id,
      activationDate,
      expirationDate,
      ...rest,
    };
  }, [thePackage]);

  if (packageLoading) {
    return <GlobalLoader />;
  }
  if (packageError) {
    return <GlobalError />;
  }

  const handleSubmit = (data) => {
    return updatePackage(data)
      .then((response) => {
        if (response) {
          if (response.success) {
            let key = enqueueSnackbar("Package saved", {
              onClick: () => {
                closeSnackbar(key);
              },
            });
            if (redirect) history.push(redirect);
            else history.push(GlobalAppRouter.paths.packages);
          } else {
            enqueueSnackbar("Error while updating package", {
              variant: "error",
            });
            return response;
          }
        }
      })
      .catch((e) =>
        enqueueSnackbar("Error while updating package", { variant: "error" })
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
        <CreatePackageForm
          isEditing={true}
          onSubmit={handleSubmit}
          initialValues={preparedValues}
        />
      </Paper>
    </div>
  );
};

export default EditPackagePage;
