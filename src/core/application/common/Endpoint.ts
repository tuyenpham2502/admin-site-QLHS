export default class Endpoint {

    static AccountManagement = class {
        static signInWithEmail = 'Accounts/SignIn'
        static getMyProfile = 'Users/UserProfiles'
        static logout = 'auth/logout'
    }

    static DashboardManagement = class {
        static getFilms = 'film/getFilms'
    }
}