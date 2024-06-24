import { object, string } from 'yup';

const AddSickLeaveFormScheme = object({
    companyName: string()
        .required('You must specify name'),

    occupation: string()
        .required('You must specify occupation'),

    startDate: string()
        .required('You must specify start date'),

    days: string()
        .required('You must specify amount of days'),
})

export default AddSickLeaveFormScheme;