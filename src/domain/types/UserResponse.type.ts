import { IUser } from "../IUser.interface"

export type UserResponse = {
    users: IUser[],
    totalPages: number,
    currentPage: number
}