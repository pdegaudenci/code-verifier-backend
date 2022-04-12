import { BasicResponse, OutputResponse } from '../types'

export interface IHelloController {
    getMessage(name?: string): Promise<BasicResponse>
}

export interface IGoodbyController {
    getMessage(name?: string): Promise<OutputResponse>
}

export interface IUsersController {
    // Obtiene todos los usuarios || obtiene usuario por ID
    geUsers(id?: string): Promise<any>
    // Borra usuario por ID
    deleteUser(id?: string): Promise<any>
    // Crear nuevo usuario
    createUser(user: any): Promise<any>
    // Actualizar usuario
    updateUser(id: string, user: any): Promise<any>

}
