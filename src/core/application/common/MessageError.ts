interface ErrorElement {
    name : string;
    message: string;
    code: any;
}

export default class MessageErrors {
    static Data : ErrorElement[] = [
        {
            name: " Unauthorized",
            message: "Không có quyền truy cập",
            code: 401
        },
        {
            name: "AuthenticationFailed",
            message: "Tài khoản hoặc mật khẩu không đúng",
            code: "000005"
        }
    ]
}
