import { array, object, string } from 'yup';

const AddPrescriptionFormScheme = object({
    items: array(object({
        dosage: string()
            .nullable(true)
            .required('Dosage is required'),

        route: string()
            .nullable(true)
            .required('Route is required'),

        frequency: string()
            .nullable(true)
            .required('Frequency is required'),

        directions: string()
            .nullable(true)
            .required('Directions is required'),

        duration: string()
            .nullable(true)
            .required('Directions is required'),
    })),

    notes: string()
        .nullable()
        .test('len', 'Must be less than 2000 characters', (value) => {
            return value ? value.length <= 2000 : true;
        }),

})

export default AddPrescriptionFormScheme;