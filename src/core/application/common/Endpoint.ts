export default class Endpoint {

    static AccountManagement = class {
        static signInWithEmail = 'auth/login'
        static getMyProfile = 'users/me'
        static logout = 'auth/logout'
    }
}