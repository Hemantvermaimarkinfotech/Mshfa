import { useQuery, useMutation } from "@apollo/client";
import { AdvertisementApi } from "api";

export const useAdvertisements = (variables = {}) => {
  const { data, loading, error, refetch } = useQuery(AdvertisementApi.getAllAdvertisement(), {
    variables,
  });
  let advertisement;

  if (data?.allAdvertisement) {
    advertisement = data.allAdvertisement.edges.map((edge) => edge.node);
  }

  return {
    advertisement,
    advertisementLoading: loading,
    advertisementError: error,
    refetchAdvertisement: refetch,
  };
};

export const useAdvertisement = (id) => {
  const { data, loading, error, refetch } = useQuery(AdvertisementApi.getAdvertisementById(), {
    variables: { id },
    errorPolicy: "all",
  });

  console.log('data', data);
  
  let advertise;

  if (data?.advertise) {
    advertise = data.advertise;
  }

  return { advertise, advertiseLoading: loading, advertiseError: error, refetch };
};


export const useAdvertisementAPI = () => {
  const cacheFunc = {
    update(cache) {
      cache.evict({ id: "ROOT_QUERY", fieldName: "allAdvertisement" });
    },
  };

  const [create] = useMutation(AdvertisementApi.createAdvertisement(), cacheFunc);
  const [update] = useMutation(AdvertisementApi.updateAdvertisement(), cacheFunc);
  const [advertisementDelete] = useMutation(AdvertisementApi.deleteAdvertisement(), cacheFunc);

  const deleteAdvertisement = (data) => {
    return advertisementDelete({ variables: { input: data } }).then(
      (response) => response.data?.deleteAdvertise
    );
  };

  const createAdvertisement = (data) => {
    return create({ variables: { input: data } }).then(
      (response) => response.data?.createAdvertise
    );
  };

  const updateAdvertisement = (data) => {
    return update({ variables: { input: data } }).then(
      (response) => response.data?.updateAdvertise
    );
  };

  return {
    createAdvertisement,
    deleteAdvertisement,
    updateAdvertisement,
  };
};
