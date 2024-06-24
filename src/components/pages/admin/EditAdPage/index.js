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
import { CreateAdForm } from "components/forms";
import { useAd, useAdsAPI } from "hooks/ads";
import { GlobalAppRouter } from "routes";
import { updateToOpenArray } from "utils/common";

const EditAdPage = ({ route }) => {
  const title = route.meta?.title;
  const redirect = useReactiveVar(state.adProfileRedirect);
  const history = useHistory();
  const { id } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { ad, adLoading, adError, refetch } = useAd(id);
  const { updateAd } = useAdsAPI();

  useEffect(() => {
    refetch();
  }, []);

  const preparedValues = useMemo(() => {
    if (!ad) return null;

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
    } = ad;

    const updatedExpiryDate = new Date(expiryDateTime).toISOString();
    const getDoctorId = doctorId?.id;
    const adToOpenIndex = updateToOpenArray?.find((o) => o.val === toOpen);
    const getServiceType = doctorId?.serviceType?.key;

    return {
      name: name,
      id: ad.id,
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
  }, [ad]);

  if (adLoading) {
    return <GlobalLoader />;
  }
  if (adError) {
    return <GlobalError />;
  }

  
  const handleSubmit = (data) => {
    return updateAd(data)
      .then((response) => {
        if (response) {
          if (response.success) {
            let key = enqueueSnackbar("Ad saved", {
              onClick: () => {
                closeSnackbar(key);
              },
            });
            if (redirect) history.push(redirect);
            else history.push(GlobalAppRouter.paths.ads);
          } else {
            enqueueSnackbar("Error while updating ad", {
              variant: "error",
            });
            return response;
          }
        }
      })
      .catch((e) =>
        enqueueSnackbar("Error while updating ad", { variant: "error" })
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
        <CreateAdForm
          isEditing={true}
          onSubmit={handleSubmit}
          initialValues={preparedValues}
        />
      </Paper>
    </div>
  );
};

export default EditAdPage;
