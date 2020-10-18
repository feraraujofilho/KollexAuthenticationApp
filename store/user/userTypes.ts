export const CREATE_USER = "CREATE_USER"
export const UPDATE_STORE_USER = "UPDATE_STORE_USER"

export interface UserInterface {
    firstName?: string,
    lastName?: string,
    email: string,
    password: string,
    phoneNumber: number,
    authId?: string
}