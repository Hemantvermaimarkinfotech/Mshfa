export default class TokenStorage {

    static LOCAL_STORAGE_TOKEN = 'token';
    static LOCAL_STORAGE_REFRESH_TOKEN = 'refresh_token';

    static isAuthenticated() {
        return this.getToken() !== null;
    }

    static getAuthenticationHeader() {
        return 'JWT ' + this.getToken();
    }

    static storeToken(token) {
        localStorage.setItem(TokenStorage.LOCAL_STORAGE_TOKEN, token);
    }

    static storeRefreshToken(refreshToken) {
        localStorage.setItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN, refreshToken);
    }

    static clear() {
        localStorage.removeItem(TokenStorage.LOCAL_STORAGE_TOKEN);
        localStorage.removeItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
    }

    static getRefreshToken() {
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_REFRESH_TOKEN);
    }

    static getToken() {
        return localStorage.getItem(TokenStorage.LOCAL_STORAGE_TOKEN);
    }
}
