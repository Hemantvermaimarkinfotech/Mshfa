import { number, object, string, boolean, mixed } from "yup";

const SUPPORTED_FORMATS = ['image/jpeg', 'image/png'];

const MAX_FILE_SIZE= 20971520

export const MedicationScheme = () => {
    return object({
        picture: mixed()
            .nullable(true)
            .test('fileSize', 'File too large', (value) => !value || (value && value.size <= MAX_FILE_SIZE))
            .test(
                'fileFormat',
                'Unsupported file type',
                (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
            ),
        externalId: string()
            .required('Enter external ID'),
        title: string()
            .required('Entering Name is required'),
        description: string()
            .nullable(true),
        price: number()
            .typeError("Must be a number")
            .nullable(true),
        prescriptionRequired: boolean()
    })
}

export const defaultValues = {
    title: '',
    description: '',
    price: '',
    prescriptionRequired: false
}