import { number, object, string, boolean } from "yup";


export const OrderItemScheme = () => {
    return object({
        id: string()
            .required('Choose test'),
        title: string()
            .required('Choose test'),
        qty: number().integer().min(1, 'Must be greater than 0')
            .typeError("Must be a number")
            .nullable(true),
        homeService: boolean()
    })
}

export const defaultValues = {
    id: '',
    title: '',
    qty: 1,
    homeService: false,
}