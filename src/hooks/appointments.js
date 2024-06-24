import {useMutation, useQuery, useSubscription} from "@apollo/client";
import {AppointmentAPI} from "api";
import { userRole } from "config/user.config";

export const useAppointments = (variables, options) => {


    const { data, loading, error, refetch } = useQuery(AppointmentAPI.getAllAppointments(), {
        variables: variables,
        ...options
    });

    let appointments;

    if (data?.appointmentListOfAdmin) {
        appointments = data.appointmentListOfAdmin.edges.map(edge => edge.node)
            .filter(appointment => !!appointment.patient);
    }

    return { appointments, appointmentsLoading: loading, appointmentsError: error, refetchAppointments: refetch };

}

export const useDoctorAppointments =(variables, options)=>{
    
    const { data, loading, error, refetch } = useQuery(AppointmentAPI.getDoctorAllAppointments(), {
        variables: variables,
        ...options
    });

    let doctorAppointments;
 
    if (data?.appointmentList) {
        doctorAppointments = data.appointmentList.edges.map(edge => edge.node)
            .filter(appointment => !!appointment.patient);
    }

    return { doctorAppointments, doctorAppointmentsLoading: loading, doctorAppointmentsError: error, refetchDoctorAppointments: refetch };

}

export const useAppointment = (id) => {

    const currentUserRole = localStorage.getItem('role').toLowerCase();
    const { data, loading, error } = useQuery(AppointmentAPI.getAppointmentById(), { variables: { id, isAdmin: currentUserRole === userRole.ADMIN } });

    let appointment;

    if (data?.appointmentDetails) {
        appointment = data.appointmentDetails;
    }

    return { appointment, appointmentLoading: loading, appointmentError: error };

}

export const useAppointmentsEvents = (variables, options) => {

    const { data, loading } = useSubscription(AppointmentAPI.onAppointmentChange(), { variables, ...options,
        onSubscriptionData: ({ client }) => {
            client.cache.evict({ id: 'ROOT_QUERY', fieldName: 'appointmentListOfAdmin' });
        },
    });

    let notification;

    if (data?.onAppointmentChange) {
        notification = data.onAppointmentChange;
    }

    return { notification, loading };
}

export const useAppointmentAPI = () => {

    const cacheFunc = {update(cache) {
            cache.evict({ id: 'ROOT_QUERY', fieldName: 'appointmentListOfAdmin' });
        }};

    const [update] = useMutation(AppointmentAPI.updateAppointment(), cacheFunc);

    const [autoSave] = useMutation(AppointmentAPI.autoSaveAppointment(), cacheFunc);

    const [upload] = useMutation(AppointmentAPI.uploadToAppointment(), {
        update(cache) {
            cache.evict({ id: 'ROOT_QUERY', fieldName: 'appointmentDetails' });
        }
    });

    const [resolve] = useMutation(AppointmentAPI.resolveAppointment(), cacheFunc);

    const [appointmentStart] = useMutation(AppointmentAPI.appointmentStart(), cacheFunc);

    const [decline] = useMutation(AppointmentAPI.appointmentDecline(), cacheFunc);

    const [reject] = useMutation(AppointmentAPI.appointmentReject(), cacheFunc);

    const [reschedule] = useMutation(AppointmentAPI.appointmentReschedule(), cacheFunc);

    const [reassign] = useMutation(AppointmentAPI.appointmentReassign());

    const [confirm] = useMutation(AppointmentAPI.appointmentConfirm(), cacheFunc);

    const [report] = useMutation(AppointmentAPI.reportAbuse(), cacheFunc);

    const updateAppointment = (data) => {
        return update({ variables: { input: data } })
            .then((response) => response.data?.appointmentUpdate)
    }

    const autoSaveAppointment = (data) => {
        return autoSave({ variables: { input: data } })
            .then((response) => response.data?.appointmentUpdate)
    }

    const resolveAppointment = (data) => {
        return resolve({ variables: { input: data } })
            .then((response) => response.data?.appointmentResolve)
    }

    const uploadToAppointment = (data) => {
        return upload({ variables: { input: data } })
            .then((response) => response.data?.appointmentUploadCreate)
    }

    const startAppointment = (data) => {
        return appointmentStart({ variables: { input: data } })
            .then((response) => response.data?.appointmentStart)
    }

    const declineAppointment = (data) => {
        return decline({ variables: { input: data } })
            .then((response) => response.data?.appointmentDecline)
    }

    const rejectAppointment = (data) => {
        return reject({ variables: { input: data } })
            .then((response) => response.data?.appointmentReject)
    }

    const confirmAppointment = (data) => {
        return confirm({ variables: { input: data } })
            .then((response) => response.data?.appointmentConfirm)
    }

    const rescheduleAppointment = (data) => {
        return reschedule({ variables: { input: data } })
            .then((response) => response.data?.appointmentReschedule)
    }

    const reassignDoctor = (data) => {
        return reassign({ variables: { input: data } })
            .then((response) => response.data?.appointmentReassign)
    }

    const reportAbuse = (data) => {
        return report({variables: {input: data}})
            .then((response) => response.data?.abuseRecordCreate)
    }

    return {
        autoSaveAppointment,
        updateAppointment,
        uploadToAppointment,
        resolveAppointment,
        startAppointment,
        declineAppointment,
        rejectAppointment,
        confirmAppointment,
        rescheduleAppointment,
        reassignDoctor,
        reportAbuse
    };
}
