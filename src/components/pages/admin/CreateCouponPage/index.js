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
import { CreateCouponForm } from "components/forms";
import { useCouponsAPI } from "hooks/coupons";

import { GlobalAppRouter } from "routes";

const CreateCouponPage = ({ route }) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const title = route.meta?.title;

  const { createCoupon } = useCouponsAPI();
  const history = useHistory();

  const handleSubmit = (data) => {
    const { labtestOldPrice, patients, doctors, ...rest } = data;
    return createCoupon(rest)
      .then((response) => {
        if (response) {
          if (response.success) {
            let key = enqueueSnackbar("Coupon created", {
              onClick: () => {
                closeSnackbar(key);
              },
            });
            history.push(GlobalAppRouter.paths.coupons);
          } else {
            enqueueSnackbar("Error while creating Coupon", {
              variant: "error",
            });
          }
          return response;
        }
      })
      .catch((e) => {
        if (e && e?.message?.includes("PromoCodeHomeServiceSetup")) {
          enqueueSnackbar("Coupon created"); //temp
          history.push(GlobalAppRouter.paths.coupons); //temp
        } else {
          enqueueSnackbar("Error while creating Coupon", { variant: "error" });
        }
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
        <CreateCouponForm onSubmit={handleSubmit} />
      </Paper>
    </div>
  );
};

export default CreateCouponPage;
