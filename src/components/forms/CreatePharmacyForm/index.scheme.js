import { string, object, array, boolean, number } from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { emailValidator, workingDayValidator } from "../index.validators";

export const GeneralInfoScheme = () => {
    return object({
        title: string()
            .required('Entering name is required'),
        area: string()
            .nullable(true)
            .required('Area is required'),
        block: string()
            .nullable(true)
            .required('Block is required'),
        street: string()
            .required('Street is required'),
        building: number("Must be a number").nullable(true)
            .required('Building is required'),
        deliveryTime: number().nullable(true),
        deliveryFee: number()
            .typeError("Delivery Fee must be a number")
            .nullable(true)
            .required('Delivery Fee is required')
            .positive("Delivery Fee should be greater than 0"),
        minimumOrderPrice:  number()
            .typeError("Minimum Order price must be a number")
            .nullable(true)
            .required('Minimum Order price is required')
            .positive("Minimum Order price should be greater than 0"),
        email: string()
            .test(emailValidator)
            .required('Entering email is required'),
        phones: array(object({
            phone: string()
                .test(
                    'phone-number',
                    'Phone number must be valid',
                    function (value = '') {
                        const result = parsePhoneNumberFromString(value);
                        if (result) {
                            return !!result.isValid();
                        }
                        return false;
                    }
                )
                .required('Entering a phone number is required'),
        })),
    })
}

export function WorkingHoursScheme() {
    return object({
        workingHours: object({
            sun: workingDayValidator(),
            mon: workingDayValidator(),
            tue: workingDayValidator(),
            wed: workingDayValidator(),
            thu: workingDayValidator(),
            fri: workingDayValidator(),
            sat: workingDayValidator(),
        }),
    })
}

export const defaultValues = {
    title: '',
    area: '',
    block: '',
    street: '',
    building: '',
    email: '',
    deliveryTime: '',
    deliveryFee: '',
    minimumOrderPrice: '',
    phones: [
        {
            phone: '',
        }
    ],
    workingHours: {
        sun: [],
        mon: [],
        tue: [],
        wed: [],
        thu: [],
        fri: [],
        sat: [],
    },
}
