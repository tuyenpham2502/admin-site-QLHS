export default class Endpoint {

    static AccountManagement = class {
        static signInWithEmail = 'Accounts/SignIn'
        static getMyProfile = 'users/me'
        static logout = 'auth/logout'
    }

    static DashboardManagement = class {
        static getFilms = 'film/getFilms'
    }
}