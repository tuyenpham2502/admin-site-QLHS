import Account from "src/core/domain/identity/Account"

export default interface ICurrentUserService{
    getUser():Account
    getId():string,
    getToken():string,
    getRefreshToken():string
}