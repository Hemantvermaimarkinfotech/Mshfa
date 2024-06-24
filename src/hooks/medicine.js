import { useQuery, useMutation } from "@apollo/client";
import { MedicineAPI } from "api";

export const useMedicine = (id) => {

    const { data, loading, error, refetch } = useQuery(MedicineAPI.getMedicineById(), { variables: { id } });

    let medicine;

    if (data?.medicineDetails) {
        medicine = data.medicineDetails;
    }

    return { medicine, medicineLoading: loading, medicineError: error, refetchMedicine: refetch };
}

export const useMedicineAPI = () => {

    const cacheFunc = {update(cache) {
        cache.evict({ id: 'ROOT_QUERY', fieldName: 'medicineList' });
    }};

    const [create] = useMutation(MedicineAPI.createMedicine(), cacheFunc);
    const [update] = useMutation(MedicineAPI.updateMedicine(), cacheFunc);
    const [medicineDelete] = useMutation(MedicineAPI.deleteMedicine(), cacheFunc);
    const [approve] = useMutation(MedicineAPI.approveMedicine(), cacheFunc);
    const [reject] = useMutation(MedicineAPI.rejectMedicine(), cacheFunc);
    const [upload] = useMutation(MedicineAPI.bulkUpload(), cacheFunc);
    const [uploadArchive] = useMutation(MedicineAPI.bulkArchiveUpload(), cacheFunc);

    const createMedicine = (data) => {
        return create({ variables: { input: data }})
            .then((response) => response.data?.medicineCreate)
    }

    const updateMedicine = (data) => {
        return update({ variables: { input: data }})
            .then((response) => response.data?.medicineUpdate)
    }

    const deleteMedicine = (id) => {
        return medicineDelete({ variables: { input: { medicineId: id } } })
            .then((response) => response.data?.medicineDelete)
    }

    const approveMedicine = (id) => {
        return approve({ variables: { input: { medicineId: id } } })
            .then((response) => response.data?.medicineApprove)
    }

    const rejectMedicine = (id) => {
        return reject({ variables: { input: { medicineId: id } } })
            .then((response) => response.data?.medicineReject)
    }

    const bulkUpload = (data) => {
        return upload({ variables: { input: data } })
            .then((response) => response.data?.medicineBulkUpdate)
    }

    const bulkArchiveUpload = (data) => {
        return uploadArchive({ variables: { input: data } })
            .then((response) => response.data?.medicineArchiveBulkUpdate)
    }

    return { bulkUpload, bulkArchiveUpload, createMedicine, updateMedicine, deleteMedicine, approveMedicine, rejectMedicine };

}

export const useMedicines = (params) => {
    const variables = params ? { variables: params } : undefined;
    const { data, loading, error, refetch } = useQuery(MedicineAPI.getAllMedicines(), variables);
    let medicines = [];

    if (data?.medicineList) {
        medicines = data.medicineList.edges.map(edge => edge.node);
    }

    return {
        medicines,
        medicinesLoading: loading,
        medicinesError: error,
        refetchMedicines: refetch
    };
}
