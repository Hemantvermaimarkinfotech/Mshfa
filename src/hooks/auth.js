import { useMutation } from "@apollo/client";

import { AuthAPI } from 'api';
import { TokenStorage } from 'services';

export const useAuth = () => {
    const [login] = useMutation(AuthAPI.singIn());
    const [refresh] = useMutation(AuthAPI.refreshToken());
    const [resetUserPassword] = useMutation(AuthAPI.resetPassword());
    const [createNewUserPassword] = useMutation(AuthAPI.resetPasswordConfirm());
    const [checkEmailTokenLink] = useMutation(AuthAPI.checkEmailTokenLink());
    const [emailConfirm] = useMutation(AuthAPI.emailConfirm());

    const signIn = (email, password) => {

        return login({ variables: { email, password } })
            .then(response => {
                console.log('manikkkkkkk',response.data)
                const { emailAuth } = response.data;
                if (emailAuth) {
                    const { token, refreshToken, user } = emailAuth;
                    TokenStorage.storeToken(token);
                    TokenStorage.storeRefreshToken(refreshToken);
                    localStorage.setItem('role', user.role);
                    window.location = window.location.origin;
                }
            });
    }

    const resetPassword = (email) => {
        return resetUserPassword({ variables: { input: { email } } });
    }

    const createNewPassword = (password, uid, token) => {
        return createNewUserPassword({ variables: { input: { newPassword1: password, newPassword2: password, uid, token } } });
    }

    const verifyResetPasswordLink = (uid, token) => {
        return checkEmailTokenLink({ variables: { input: { uid, token } } });
    }

    const confirmEmail = (uid, token) => {
        return emailConfirm({ variables: { input: { uid, token } } });
    }

    const logout = () => {
        TokenStorage.clear();
        localStorage.removeItem('role');
        window.location = window.location.origin;
    }

    const refreshToken = (token) => {
        return refresh({ variables: { refreshToken: token } })
    }

    return {
        logout,
        login: signIn,
        refreshToken,
        createNewPassword,
        resetPassword,
        verifyResetPasswordLink,
        confirmEmail
    };
};