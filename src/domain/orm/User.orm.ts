import { userEntity } from '../entities/User.entity'
import { LogSucess, LogError } from '../../utils/logger'

// Preticiones CRUD

/**
 * Obtiene todos los usuarios de la colleccion
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        const userModel = userEntity()

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
// Create USeer
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

// GetUserByEmail