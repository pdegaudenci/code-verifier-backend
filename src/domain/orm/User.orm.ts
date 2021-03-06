/* eslint-disable indent */
import { userEntity } from '../entities/User.entity'
import { IUser } from '../IUser.interface'
import { LogSucess, LogError } from '../../utils/logger'
import { IAuth } from '../IAuth.interface'
import mongoose from 'mongoose'
// Cifrado de contraseñas
import bcrypt from 'bcrypt'
// Generacion de JWToken
import jwt from 'jsonwebtoken'
// USo de variables de entorno
import dotenv from 'dotenv'
import { UserResponse } from '../types/UserResponse.type'
import { kataEntity } from '../entities/Kata.Entity'
import { IKata } from '../IKata.interface'

// Acceso a .env
dotenv.config()

// Obtener secret key
let secretKey = process.env.SECRET_KEY || 'MY SECRET KEY';
// Preticiones CRUD

export const getKatasFromUser = async (id: string, page: number, limit: number): Promise<any[] | undefined> => {
    try {
        let userModel = userEntity()
        let kataModel = kataEntity()

        const response: any = {}
        let objectIds: mongoose.Types.ObjectId[] = []
        // Buscar todos los usuarios (usando la paginacion)
        await userModel.findById(id).then((user) => {

            // Si encuentra usuario
            response.user = user.email
            response.katas = user.katas
            // Crear tipo para busqueda

        }).catch((error) => {
            LogError(`[ORM ERROR] Obteniendo usuario: ${error}`)
        })
        response.katas.forEach((kataId: string) => {
            objectIds.push(new mongoose.Types.ObjectId(kataId))
        });

        // busca katas cuyo id se encuentre dentro del la lista de katas del usuario (objectIds= user.katas)
        await kataModel.find({ "_id": { "$in": objectIds } }).then((katas: IKata[]) => {
            // busqueda devuelve lista de katas

            response.katasFound = katas;

        })
        // Contar cantidad total de documentos de coleccion "Users"
        await userModel.count().then((total: number) => {
            response.totalPages = Math.ceil(total / limit) // numero de paginas en funcion del limite
            response.currentPage = page
            console.log(response.katasFound)
        })

        return response;

        // return await userModel.find({ isDelete: false }) // busca aquellos que no estan borrados
    } catch (error) {
        LogError(`[ORM ERROR]: GET All User: ${error}`)
    }
}



/**
 * Obtiene todos los usuarios de la colleccion
 */
export const getAllUsers = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        const userModel = userEntity()

        let response: any = {}
        // Buscar todos los usuarios (usando la paginacion)
        await userModel.find({ isDelete: false })
            .select('name email age katas') // proyeccion
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((users: IUser[]) => {
                // Limpiar contraseña de resultado

                /*
                users.forEach((user: IUser) => {
                    user.password = ''
                })*/
                response.users = users

            })



        // Contar cantidad total de documentos de coleccion "Users"
        await userModel.count().then((total: number) => {
            response.totalPages = Math.ceil(total / limit) // numero de paginas en funcion del limite
            response.currentPage = page

        })

        return response;

        /**
         * JSON DE RESPUESTA
         * users ={
         *  [
         *    {}
         *  ],
         *  totalPage:2 ,
         *  currentPAge:2
         * }
         */

        LogSucess('[API/USERS] Get All Users')
        // return await userModel.find({ isDelete: false }) // busca aquellos que no estan borrados
    } catch (error) {
        LogError(`[ORM ERROR]: GET All User: ${error}`)
    }
}
// GetUSerById
export const getUserById = async (id: String): Promise<any | undefined> => {
    try {
        const userModel = userEntity()
        return await userModel.findById(id).select('name age email katas')
    } catch (error) {
        LogError(`[ORM ERROR]: GET USER BY id: ${error}`)
    }
}



// Delete User by Id
export const deleteUserById = async (id: String): Promise<any | undefined> => {
    try {
        const userModel = userEntity()
        // Delete user by ID
        return await userModel.deleteOne({ _id: id })
    } catch (error) {
        LogError('[ORM error] Deleting user by id')
    }
}

// Actualizar usuario por ID
export const updateUser = async (id: string, user: any): Promise<any | undefined> => {
    try {
        const userModel = userEntity()
        console.log(id)
        // actualiza usuario (Recibe filtro y datos de usuario)
        return await userModel.findByIdAndUpdate(id, user)
    } catch (error) {
        LogError('[ORM error] updating user')
    }
}

// Registro de usuario
export const registerUser = async (user: IUser): Promise<any | undefined> => {
    try {
        const userModel = userEntity()
        // Crea usuario
        return await userModel.create(user)
    } catch (error) {
        LogError('[ORM error] creating user')
    }
}

// Login
export const loginUser = async (auth: IAuth): Promise<any | undefined> => {


    try {
        const userModel = userEntity()
        let userFound: IUser | undefined = undefined;
        let token = undefined;

        // Buscar usuario por email
        await userModel.findOne({ email: auth.email }).then((user: IUser) => {
            userFound = user

        }).catch((error) => {

            throw new Error(`[ERROR Autentication in ORM]: User not found: ${error}`);

        })

        // Usar BCrypt para comparar contraseña recibida en auth y la almacenada en base de datos
        const validPassword = bcrypt.compareSync(auth.password, userFound!.password);

        if (!validPassword) {
            console.log('[ERROR Autentication in ORM]: User not found')
            throw new Error(`[ERROR Autentication in ORM]: User not found:`)
        }

        //GENERAR JSON WEB TOKEN (Cuya expiracion es de 3 horas)
        token = jwt.sign({ email: userFound!.email }, secretKey, {
            expiresIn: "3h",
        })
        // Retorno usuario y token de autenticacion
        return {
            user: userFound,
            token: token
        }

        /*
            const user = await userModel.findOne({ email: auth.email }, (err: any, user: IUser) => {
                // En caso de que se encuentro un usuario con el email proporcioando
                if (err) {
                    // TODO retorna error 500
                }
                if (!user) {
                    // TODO retornar error 404 (usuario no encontrado)
                }
    
                // Usar BCrypt para comparar contraseña recibida en auth y la almacenada en base de datos
                const validPassword = bcrypt.compareSync(auth.password, user.password)
    
                // Si password no es valido -->Error 401 (No autorizado)
                if (!validPassword) {
    
                }
    
                // Crear JWT 
                // TODO Definir decret KEy en .env
                let token = jwt.sign({ email: user.email }, 'SECRET', {
                    expiresIn: "2h",
                })
    
                return token;
            })*/
    }

    catch (error) {
        LogError('[ORM error] creating user')
    }
}

// Login
export const logoutUser = async (): Promise<any | undefined> => {
    // TODO Implementar
}
