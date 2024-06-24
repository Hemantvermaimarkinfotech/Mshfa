import { SignInPage, ForgotPasswordPage, CreateNewPasswordPage, EmailConfirmationPage } from 'components/pages';

const authPaths = {
    login: '/auth/login',
    createPassword: '/auth/create-password',
    forgotPassword: '/auth/forgot-password',
}

const authRoutes = [
    {
        path: '/auth/login',
        exact: true,
        component: SignInPage,
        meta: null
    },
    {
        path: '/auth/create-password',
        exact: true,
        component: CreateNewPasswordPage,
        meta: null
    },
    {
        path: '/auth/forgot-password',
        exact: true,
        component: ForgotPasswordPage,
        meta: null
    },
    {
        path: '/auth/email-confirmation',
        exact: true,
        component: EmailConfirmationPage,
        meta: null
    }
];

export { authPaths, authRoutes };