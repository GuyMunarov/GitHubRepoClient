export interface IUser{
    displayName: string,
    token: string,
    email: string

}
export interface ILogin{
    email: string,
    password: string
}

export interface IRegister{
    displayName: string,
    email: string,
    password: string
}