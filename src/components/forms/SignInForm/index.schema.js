import { object, string } from 'yup';

import { emailValidator } from "../index.validators";

const SignInFormScheme = object({
    email: string()
        .test(emailValidator)
        .required('Email must be valid'),

    password: string()
        .required('Password must be valid'),

    remember: string()
        .required()
})

export default SignInFormScheme;