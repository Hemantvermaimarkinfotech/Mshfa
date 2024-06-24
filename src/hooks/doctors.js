import {useQuery, useMutation, useSubscription} from "@apollo/client";
import {DoctorAPI} from "api";

export const useDoctors = (variables = {}) => {

    const {data, loading, error, refetch} = useQuery(DoctorAPI.getAllDoctors(), {variables});

    let doctors;

    if (data?.doctorList) {
        doctors = data.doctorList.edges.map(edge => edge.node);
    }

    return {
        doctors,
        doctorsLoading: loading,
        doctorsError: error,
        refetchDoctors: refetch
    };
}

export const useDoctor = (id) => {

    const { data, loading, error } = useQuery(DoctorAPI.getDoctorById(), {
        variables: { id },
        errorPolicy: 'all'
    });

    let doctor;

    if (data?.doctorDetails) {
        doctor = data.doctorDetails;
    }

    return { doctor, doctorLoading: loading, doctorError: error };

}

export const useDoctorsEvents = (variables, options) => {

    const {data, loading} = useSubscription(DoctorAPI.onDoctorChange(), {
        variables, ...options,
        onSubscriptionData: ({client}) => {
            client.cache.evict({id: 'ROOT_QUERY', fieldName: 'doctorList'});
        }
    });

    let notification;

    if (data?.onDoctorChange) {
        notification = data.onDoctorChange;
    }

    return {notification, loading};
}

export const useDoctorAPI = () => {

    const cacheFunc = {
        update(cache) {
            cache.evict({id: 'ROOT_QUERY', fieldName: 'doctorList'});
        }
    };

    const [create] = useMutation(DoctorAPI.createDoctor(), cacheFunc);
    const [update] = useMutation(DoctorAPI.updateDoctor(), cacheFunc);
    const [doctorDelete] = useMutation(DoctorAPI.deleteDoctor(), cacheFunc);
    const [toggle] = useMutation(DoctorAPI.toggleDoctorStatus()); // while we not have search doctor by status clear cache not needed
    const [availableDates, { loading }] = useMutation(DoctorAPI.doctorAvailability());
    const [availableDoctors] = useMutation(DoctorAPI.availableDoctors());
    const [updateDoctorStatus] = useMutation(DoctorAPI.updateStatus(), {
        update(cache) {
            cache.evict({id: 'ROOT_QUERY', fieldName: 'me'});
        }
    });

    const createDoctor = (data) => {
        console.log('create',data)
        return create({variables: {input: data}})
            .then((response) => response.data?.doctorCreate)
    }
    const updateStatus = (data) => {
        console.log('update',data)

        return updateDoctorStatus({variables: {input: {status: data}}})
            .then((response) => response.data?.doctorStatusUpdate)
    }

    const updateDoctor = (data) => {
        return update({variables: {input: data}})
            .then((response) => response.data?.doctorUpdate)
    }

    const deleteDoctor = (data) => {
        return doctorDelete({variables: {input: data}})
            .then((response) => response.data?.doctorDelete)
    }

    const toggleDoctorsStatus = (data) => {
        return toggle({
            variables: {input: data},
            update(cache, {data: {blockUserToggle}}) {
                cache.modify({
                    id: cache.identify({__typename: DoctorAPI.typename, id: data.id}),
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

    const getAvailableDates = (data) => {
        return availableDates({variables: {input: data}})
            .then((response) => response.data?.doctorAvailability)
    }

    const getAvailableDoctors = (data) => {
        return availableDoctors({variables: data})
            .then(response => response.data?.availableDoctors);
    }

    return {
        createDoctor,
        updateStatus,
        updateDoctor,
        deleteDoctor,
        toggleDoctorsStatus,
        getAvailableDates,
        availableDatesLoading: loading,
        getAvailableDoctors
    };

}
