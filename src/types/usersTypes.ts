export interface User {
    username: string,
    password: string | number,
}

export interface UsersTypes {
    [key:string]: User
}