export interface LoginResponse {
    message: string ,
    success: boolean,
    token: string,
    id: number,
    username: string,
    email: string,
    roles: [
        string
    ]
}
