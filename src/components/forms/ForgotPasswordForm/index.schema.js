import { object, string } from 'yup';

import { emailValidator } from "../index.validators";

const ForgotPasswordFormScheme = object({
    email: string()
        .test(emailValidator)
        .required('Email must be valid'),
})

export default ForgotPasswordFormScheme;