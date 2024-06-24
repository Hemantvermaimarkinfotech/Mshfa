import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { CouponsApi } from "api";

export const useCoupons = (variables = {}) => {
  const { data, loading, error, refetch } = useQuery(
    CouponsApi.getAllCoupons(),
    { variables }
  );
  let coupons;

  if (data?.promoCodes) {
    coupons = data.promoCodes.edges.map((edge) => edge.node);
  }
  return {
    coupons,
    couponsLoading: loading,
    couponsError: error,
    refetchCoupons: refetch,
  };
};

export const useCoupon = (id) => {
  const { data, loading, error, refetch } = useQuery(CouponsApi.getCouponById(), {
    variables: { id },
    errorPolicy: "all",
  });

  let coupon;

  if (data?.promoCodeById) {
    coupon = data.promoCodeById;
  }

  return { coupon, couponLoading: loading, couponError: error, refetch };
};

export const useCouponsAPI = () => {
  const cacheFunc = {
    update(cache) {
      cache.evict({ id: "ROOT_QUERY", fieldName: "promoCodes" });
    },
  };

  const [create] = useMutation(CouponsApi.createCoupon(), cacheFunc);
  const [update] = useMutation(CouponsApi.updateCoupon(), cacheFunc);
  const [updateStatus] = useMutation(
    CouponsApi.toggleCouponStatus(),
    cacheFunc
  );

  const toggleStatus = (data) => {
    return updateStatus({ variables: { input: data } }).then(
      (response) => response.data?.promoCodeUpdate
    );
  };

  const createCoupon = (data) => {
    return create({ variables: { input: data } }).then(
      (response) => response.data?.promoCodeCreate
    );
  };

  const updateCoupon = (data) => {
    return update({ variables: { input: data } }).then(
      (response) => response.data?.promoCodeUpdate
    );
  };

  return {
    createCoupon,
    toggleStatus,
    updateCoupon,
  };
};
