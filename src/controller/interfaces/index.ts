import { BasicResponse, OutputResponse } from '../types'
import { IUser } from '../../domain/IUser.interface'
import { IKata } from '../../domain/IKata.interface'

export interface IHelloController {
    getMessage(name?: string): Promise<BasicResponse>
}

export interface IGoodbyController {
    getMessage(name?: string): Promise<OutputResponse>
}

export interface IUsersController {
    // Obtiene todos los usuarios || obtiene usuario por ID
    geUsers(page: number, limit: number, id?: string): Promise<any>
    // Borra usuario por ID
    deleteUser(id?: string): Promise<any>
    // Actualizar usuario
    updateUser(id: string, user: any): Promise<any>
    // Obtener katas de un usuario
    getKatas(page: number, limit: number, id?: string): Promise<any>

}

export interface IKatasInterface {
    // Obtiene todos las katas || obtiene kata por ID
    getKatas(page: number, limit: number, id?: string): Promise<any>
    // Borra kata por ID
    deleteKata(editror: string, id?: string): Promise<any>
    // Crear nuevo kata
    createKata(kata: IKata): Promise<any>
    // Actualizar kata
    updateKata(id: string, kata: IKata, editor: string): Promise<any>
    // obtoner katas por nivel de dificultad
    getKataByLevel(level: Number): Promise<any>
    // obtener las 5 Katas más recientes
    getFiveMostRecent(): Promise<any>
    // Valorar kata y almacena la media
    scoreKata(id: string, score: Number): Promise<any>
    // Katas ordenadas por intentos 
    getKataOrderedByChances(): Promise<any>
    //Katas ordenados por valoraciones (medias)
    getKatasOrderedByScore(): Promise<any>
    // Obtener katas de un usuario



}

export interface IAuthController {
    // Registrar usuario
    registerUser(user: IUser): Promise<any>
    // Login de usuario
    loginUser(auth: any): Promise<any>
    // logout
    logOutUser(): Promise<any>
    // Informacion de usuario
    userData(id: string): Promise<any>

}
