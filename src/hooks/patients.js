import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import PatientAPI from "api/patient.api";

export const usePatient = (id) => {

    const { data, loading, error, refetch } = useQuery(PatientAPI.getPatientById(), {
        variables: { id },
        errorPolicy: 'all',
    });

    let patient;

    if (data?.patientDetails) {
        patient = data.patientDetails;
    }

    return { patient, patientLoading: loading, patientError: error, refetchPatient: refetch };

}

export const usePatientAPI = () => {

    const cacheFunc = {
        update(cache) {
            cache.evict({ id: 'ROOT_QUERY', fieldName: 'patientList' });
            cache.evict({ id: 'ROOT_QUERY', fieldName: 'appointmentDetails' });
        }
    };

    const [ getData, { loading, error, data } ] = useLazyQuery(PatientAPI.getPatientById());

    const [patientDelete] = useMutation(PatientAPI.togglePatientStatus(), cacheFunc);
    const [update] = useMutation(PatientAPI.updatePatient(), cacheFunc);


    const [toggle] = useMutation(PatientAPI.togglePatientStatus());

    const deletePatient = (data) => {
        return patientDelete({ variables: { input: data }})
            .then((response) => response.data?.blockUserToggle)
    }

    const updatePatient = (data) => {
        return update({ variables: { input: data }})
            .then((response) => response.data?.patientUpdate)
    }

    const togglePatientStatus = (data) => {
        return toggle({ variables: { input: data },
            update(cache, { data: { blockUserToggle } }) {
                cache.modify({
                    id: cache.identify({__typename: PatientAPI.typename, id: data.id}),
                    fields: {
                        isBlocked() {
                            return blockUserToggle.isBlocked;
                        },
                    },
                })

            }
        })
          .then((response) => response.data?.blockUserToggle)
    }

    const getPatient = (id) => {
        getData({
            variables: { id },
            errorPolicy: 'all',
        })
        return { loading, error, data };
    }

    return { togglePatientStatus, deletePatient, updatePatient, getPatient };

}