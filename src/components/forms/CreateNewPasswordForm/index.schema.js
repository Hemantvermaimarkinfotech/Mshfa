import { object, string } from 'yup';

import formsConfig from 'config/forms.config';

const CreateNewPasswordFormScheme = object({
    password: string()
        .matches(formsConfig.passwordRegExp, 'Password should contain numbers, uppercase and lowercase letters and have 8-16 length')
        .required('Password is required'),
})

export default CreateNewPasswordFormScheme;