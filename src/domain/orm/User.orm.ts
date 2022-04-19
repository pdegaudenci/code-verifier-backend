/* eslint-disable indent */
import { userEntity } from '../entities/User.entity'
import { IUser } from '../IUser.interface'
import { LogSucess, LogError } from '../../utils/logger'
import { IAuth } from '../IAuth.interface'
// Cifrado de contraseñas
import bcrypt from 'bcrypt'
// Generacion de JWToken
import jwt from 'jsonwebtoken'

// Preticiones CRUD

/**
 * Obtiene todos los usuarios de la colleccion
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        const userModel = userEntity()
        LogSucess('[API/USERS] Get All Users')
        return await userModel.find({ isDelete: false }) // busca aquellos que no estan borrados
    } catch (error) {
        LogError(`[ORM ERROR]: GET All User: ${error}`)
    }
}
// GetUSerById
export const getUserById = async (id: String): Promise<any | undefined> => {
    try {
        const userModel = userEntity()
        return await userModel.findById(id)
    } catch (error) {
        LogError(`[ORM ERROR]: GET USER BY id: ${error}`)
    }
}

// TODO

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
// Crear Usuario
export const createUser = async (user: any): Promise<any | undefined> => {
    try {
        const userModel = userEntity()
        // Crea usuario
        return await userModel.create(user)
    } catch (error) {
        LogError('[ORM error] creating user')
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
        // Buscar usuario por email
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
        })
    } catch (error) {
        LogError('[ORM error] creating user')
    }
}

// Login
export const logoutUser = async (): Promise<any | undefined> => {
    // TODO Implementar
}
