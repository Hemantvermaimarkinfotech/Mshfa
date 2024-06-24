import { object, string } from 'yup';

const AddReferralFormScheme = object({
    hospital: string()
        .nullable(true)
        .required('You must specify hospital'),

    department: string()
        .nullable(true)
        .required('You must specify department'),

    complaintsForTransfer: string()
        .required('You must specify complaints'),

    reasonForReferral: string()
        .required('You must specify reasons'),
})

export default AddReferralFormScheme;