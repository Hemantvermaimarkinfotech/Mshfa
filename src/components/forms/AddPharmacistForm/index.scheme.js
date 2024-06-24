import { object, string } from "yup";
import { emailValidator } from "components/forms/index.validators";

export const PharmacistScheme = () => {
    return object({
        firstName: string()
            .required('Entering first name is required'),

        lastName: string()
            .required('Entering last name is required'),
        email: string()
            .test(emailValidator)
            .required('Entering email is required'),
        notes: string()
            .nullable(true)
            .notRequired(),
    })
}

export const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    notes: ''
}