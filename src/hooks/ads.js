import { useQuery, useMutation } from "@apollo/client";
import { AdsApi } from "api";

export const useAds = (variables = {}) => {
  const { data, loading, error, refetch } = useQuery(AdsApi.getAllAds(), {
    variables,
  });
  let ads;

  if (data?.allAds) {
    ads = data.allAds.edges.map((edge) => edge.node);
  }

  return {
    ads,
    adsLoading: loading,
    adsError: error,
    refetchAds: refetch,
  };
};

export const useAd = (id) => {
  const { data, loading, error, refetch } = useQuery(AdsApi.getAdById(), {
    variables: { id },
    errorPolicy: "all",
  });
  console.log('data', data);
  
  let ad;

  if (data?.ad) {
    ad = data.ad;
  }

  return { ad, adLoading: loading, adError: error, refetch };
};

export const useAdsAPI = () => {
  const cacheFunc = {
    update(cache) {
      cache.evict({ id: "ROOT_QUERY", fieldName: "allAds" });
    },
  };

  const [create] = useMutation(AdsApi.createAd(), cacheFunc);
  const [update] = useMutation(AdsApi.updateAd(), cacheFunc);
  const [adDelete] = useMutation(AdsApi.deleteAd(), cacheFunc);

  const deleteAd = (data) => {
    return adDelete({ variables: { input: data } }).then(
      (response) => response.data?.deleteAd
    );
  };

  const createAd = (data) => {
    return create({ variables: { input: data } }).then(
      (response) => response.data?.createAd
    );
  };

  const updateAd = (data) => {
    return update({ variables: { input: data } }).then(
      (response) => response.data?.updateAd
    );
  };

  return {
    createAd,
    deleteAd,
    updateAd,
  };
};
