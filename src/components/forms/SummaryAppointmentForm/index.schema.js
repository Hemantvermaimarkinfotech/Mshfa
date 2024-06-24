import { array, object, string } from 'yup';

const SummaryAppointmentFormScheme = object({

    complaints: array(object({
        complaint: string()
            .required('Required'),
        details: string()
            .required('Required'),
    })),

    signs: array(object({
        sign: string()
            .required('Required'),
        details: string()
            .required('Required'),
    })),

    resolution: string()
        .required(),

    diagnosis: string()
        .required(),

})

export default SummaryAppointmentFormScheme;