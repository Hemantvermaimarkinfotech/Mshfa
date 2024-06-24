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
import { CreateAdvertisementForm } from "components/forms";
import { useAdvertisement, useAdvertisementAPI } from "hooks/advertisement";
import { GlobalAppRouter } from "routes";
import { updateToOpenArray } from "utils/common";

const EditAdvertisementPage = ({ route }) => {
  const title = route.meta?.title;
  const redirect = useReactiveVar(state.advertisementProfileRedirect);
  const history = useHistory();
  const { id } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { advertise, advertiseLoading, advertiseError, refetch } = useAdvertisement(id);
  const { updateAdvertisement } = useAdvertisementAPI();
  // advertise
  useEffect(() => {
    refetch();
  }, []);


  useEffect(() => {
    setTimeout( () => {
      console.log('advertisement: ', advertise);
    }, 4000)
  })

  const preparedValues = useMemo(() => {
    if (!advertise) return null;

    const {
      __typename,
      name,
      expiryDateTime,
      isInteractive,
      isApproved,
      toOpen,
      doctorId,
      imageUrl,
      isActive,
      isPackage,
      id,
      serviceType,
      ...rest
    } = advertise;

    const updatedExpiryDate = new Date(expiryDateTime).toISOString();
    const getDoctorId = doctorId?.id;
    const adToOpenIndex = updateToOpenArray?.find((o) => o.val === toOpen);
    const getServiceType = doctorId?.serviceType?.key;

    return {
      name: name,
      id: advertise.id,
      isActive: isActive,
      expiryDateTime: updatedExpiryDate,
      isInteractive: isInteractive,
      isApproved: isApproved,
      doctorId: getDoctorId,
      serviceType: getServiceType,
      isPackage: isPackage,
      imageUrl,
      toOpen: adToOpenIndex?.key,
      ...rest,
    };
  }, [advertise]);

  if (advertiseLoading) {
    return <GlobalLoader />;
  }
  if (advertiseError) {
    return <GlobalError />;
  }



  const handleSubmit = (data) => {
    return updateAdvertisement(data)
      .then((response) => {
        if (response) {
          if (response.success) {
            let key = enqueueSnackbar("Advertisement saved", {
              onClick: () => {
                closeSnackbar(key);
              },
            });
            if (redirect) history.push(redirect);
            else history.push(GlobalAppRouter.paths.advertisement);
          } else {
            enqueueSnackbar("Error while updating advertisement", {
              variant: "error",
            });
            return response;
          }
        }
      })
      .catch((e) =>
        enqueueSnackbar("Error while updating advertisement", { variant: "error" })
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
        <CreateAdvertisementForm
          isEditing={true}
          onSubmit={handleSubmit}
          initialValues={preparedValues}
        />
      </Paper>
    </div>
  );
};

export default EditAdvertisementPage;
