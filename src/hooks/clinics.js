import { useQuery, useMutation } from "@apollo/client";
import { ClinicsApi } from "api";

export const useClinics = (variables = {}) => {
  const { data, loading, error, refetch } = useQuery(
    ClinicsApi.getAllClinics(),
    {
      variables,
    }
  );
  let clinics;

  if (data?.allClinics) {
    clinics = data.allClinics.edges.map((edge) => edge.node);
  }

  return {
    clinics,
    clinicsLoading: loading,
    clinicsError: error,
    refetchClinics: refetch,
  };
};

export const useClinic = (id) => {
  const { data, loading, error, refetch } = useQuery(
    ClinicsApi.getClinicById(),
    {
      variables: { id },
      errorPolicy: "all",
    }
  );

  let clinic;

  if (data?.clinic) {
    clinic = data.clinic;
  }

  return { clinic, clinicLoading: loading, clinicError: error, refetch };
};

export const useClinicsAPI = () => {
  const cacheFunc = {
    update(cache) {
      cache.evict({ id: "ROOT_QUERY", fieldName: "allClinics" });
    },
  };

  const [create] = useMutation(ClinicsApi.createClinic(), cacheFunc);
  const [update] = useMutation(ClinicsApi.updateClinic(), cacheFunc);
  const [clinicDelete] = useMutation(ClinicsApi.deleteClinic(), cacheFunc);

  const deleteClinic = (data) => {
    return clinicDelete({ variables: { input: data } }).then(
      (response) => response.data?.deleteClinic
    );
  };

  const createClinic = (data) => {
    return create({ variables: { input: data } }).then(
      (response) => response.data?.createClinic
    );
  };
  
  const updateClinic = (data) => {
    return update({ variables: { input: data } }).then(
      (response) => response.data?.updateClinic
    );
  };

  return {
    createClinic,
    deleteClinic,
    updateClinic,
  };
};
