import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { PharmacyAPI } from "api";

export const usePharmacy = (id) => {

    const { data, loading, error, refetch } = useQuery(PharmacyAPI.getPharmacyById(), { variables: { id }} );
    let pharmacy;
    if (data?.pharmacyDetails) {
        pharmacy = data.pharmacyDetails;
    }

    return { pharmacy, pharmacyLoading: loading, pharmacyError: error, refetchPharmacy: refetch };
}

export const usePharmacyAPI = () => {

    const cacheFunc = {update(cache) {
            cache.evict({ id: 'ROOT_QUERY', fieldName: 'pharmacyList' });
        }};

    const [create] = useMutation(PharmacyAPI.createPharmacy(), cacheFunc);
    const [update] = useMutation(PharmacyAPI.updatePharmacy(), cacheFunc);
    const [pharmacyDelete] = useMutation(PharmacyAPI.deletePharmacy(), cacheFunc);
    const [toggle] = useMutation(PharmacyAPI.togglePharmacyStatus(), cacheFunc);

    const createPharmacy = (data) => {
        return create({ variables: { input: data }})
        .then((response) => response.data?.pharmacyCreate)
    }

    const updatePharmacy = (data) => {
        return update({ variables: { input: data } })
            .then((response) => response.data?.pharmacyUpdate)
    }

    const deletePharmacy = (id) => {
        return pharmacyDelete({ variables: { input: { pharmacyId: id } }})
        .then((response) => response.data?.pharmacyDelete)
    }

    const togglePharmacyStatus = (id) => {
        return toggle({ variables: { input: { id } } })
            .then((response) => response.data?.blockPharmacyToggle)
    }

    return { createPharmacy, updatePharmacy, deletePharmacy, togglePharmacyStatus };

}

export const usePharmacies = (conditions = {}) => {
    const { data, loading, error, refetch } = useQuery(PharmacyAPI.getAllPharmacies(), {variables: conditions});
    let pharmacies = [];

    if (data?.pharmacyList) {
        pharmacies = data.pharmacyList.edges.map(edge => edge.node);
    }

    return {
        pharmacies,
        pharmaciesLoading: loading,
        pharmaciesError: error,
        refetchPharmacies: refetch
    };
}

export const useLazyPharmacy = (id) => {
    const [getMockPharmacy, { data, loading, error }] = useLazyQuery(PharmacyAPI.getPharmacyById(), {
        variables: { id },
        errorPolicy: 'all',
    });

    let pharmacy;

    if (data?.pharmacyDetails) {
        pharmacy = data.pharmacyDetails;
    }

    return {
        pharmacy,
        pharmacyLoading: loading,
        pharmacyError: error,
        getMockPharmacy
    };
}