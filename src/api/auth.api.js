import { gql } from '@apollo/client';

class AuthAPI {
    getAccessTokens() {
        return gql`
          mutation getAccessTokens($input: TokenAuthInput!) {
            tokenAuth(input: $input) {
              token
              refreshToken
              success
              errors
            }
          }
        `;
    }

    refreshToken() {
        return gql`
          mutation refreshToken($refreshToken: String!) {
            refreshToken(refreshToken: $refreshToken) {
              token
              refreshToken
              payload
            }
         }`
    };

    resetPassword() {
        return gql`
          mutation resetPassword($input: ResetPasswordInput!) {
            resetPassword(input: $input) {
              success
            }
         }`
    }

    checkEmailTokenLink() {
        return gql`
          mutation checkEmailTokenLink($input: CheckEmailTokenLinkInput!) {
            checkEmailTokenLink(input: $input) {
              success
              errors
            }
         }`
    }

    emailConfirm() {
        return gql`
          mutation emailConfirm($input: EmailConfirmInput!) {
              emailConfirm(input: $input) {
                success
                errors
              }
        }`
    }

    resetPasswordConfirm() {
        return gql`
          mutation resetPasswordConfirm($input: ResetPasswordConfirmInput!) {
            resetPasswordConfirm(input: $input) {
              success
            }
         }`
    }

    singIn() {
        return gql`
          mutation emailAuth($email: String!, $password: String!) {
            emailAuth(email: $email, password: $password) {
                token
                refreshToken
                user {
                  role
                }
            }
       }`
    }
}

export default new AuthAPI();