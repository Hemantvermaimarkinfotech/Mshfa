import "./index.scss";

import React, { useEffect, useMemo } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useReactiveVar } from "@apollo/client";
import state from "apollo/state";
import { serviceTypeArray, homeServiceArray } from "utils/common";

import {
  Paper,
  PageHeader,
  PageTitle,
  PageMetadata,
  Breadcrumbs,
  GlobalLoader,
  GlobalError,
} from "components/layout";
import { CreateCouponForm } from "components/forms";
import { useCoupon, useCouponsAPI } from "hooks/coupons";
import { GlobalAppRouter } from "routes";

const EditCouponPage = ({ route }) => {
  const title = route.meta?.title;
  const redirect = useReactiveVar(state.couponProfileRedirect);
  const history = useHistory();
  const { id } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { coupon, couponLoading, couponError, refetch } = useCoupon(id);
  const { updateCoupon } = useCouponsAPI();

  useEffect(() => {
    refetch();
  }, []);

  const preparedValues = useMemo(() => {
    if (!coupon) return null;

    const {
      __typename,
      serviceType,
      fixedAmount,
      id,
      homeServiceSetup,
      maxNoRedeem,
      maxDiscountAmount,
      isActive,
      allServices,
      allPatients,
      allLabTests,
      allDoctors,
      discountPercentage,
      endDate,
      startDate,
      couponCode,
      doctors,
      users,
      couponName,
      patients,
      labTests,
      ...rest
    } = coupon;

    let serviceTypeIndex = serviceTypeArray?.find((o) => o.val === serviceType);

    let homeServiceIndex = homeServiceArray?.find(
      (o) => o.val === homeServiceSetup
    );

    const getPatients = patients?.map((patient) => patient?.patientId);
    const getDoctors = doctors?.map((doctor) => doctor?.doctorId);
    const getLabTests = labTests.map(({ __typename, ...fields }) => fields);
    const updatedStartDate = new Date(startDate).toISOString();
    const updatedEndDate = new Date(endDate).toISOString();

    return {
      patients,
      doctors,
      promoCodeId: id,
      couponName: couponName,
      maxNoRedeem: maxNoRedeem,
      discountPercentage: discountPercentage,
      couponCode: couponCode,
      allDoctors: allDoctors,
      fixedAmount: fixedAmount,
      allPatients: allPatients,
      allLabTests: allLabTests,
      allServices: allServices,
      serviceType: serviceTypeIndex?.key,
      isActive: isActive,
      maxDiscountAmount: maxDiscountAmount,
      startDate: updatedStartDate,
      endDate: updatedEndDate,
      homeServiceSetup: homeServiceIndex?.key,
      pat: getPatients,
      doc: getDoctors,
      labTests: getLabTests,
      ...rest,
    };
  }, [coupon]);

  if (couponLoading) {
    return <GlobalLoader />;
  }
  if (couponError) {
    return <GlobalError />;
  }

  const handleSubmit = (data) => {
    const { isActive, OldPrice, patients, doctors, labtestOldPrice, ...rest } =
      data;
    return updateCoupon(rest)
      .then((response) => {
        if (response) {
          if (response.success) {
            let key = enqueueSnackbar("Coupon saved", {
              onClick: () => {
                closeSnackbar(key);
              },
            });
            if (redirect) history.push(redirect);
            else history.push(GlobalAppRouter.paths.coupons);
          } else {
            enqueueSnackbar("Error while updating coupon", {
              variant: "error",
            });
            return response;
          }
        }
      })
      .catch((e) =>
        enqueueSnackbar("Error while updating coupon", { variant: "error" })
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
        <CreateCouponForm
          isEditing={true}
          onSubmit={handleSubmit}
          initialValues={preparedValues}
        />
      </Paper>
    </div>
  );
};

export default EditCouponPage;
