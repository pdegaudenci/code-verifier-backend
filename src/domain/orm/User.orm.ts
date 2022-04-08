import { userEntity } from '../entities/User.entity'
import { LogSucess, LogError } from '@/utils/logger'

// Preticiones CRUD

/**
 * Obtiene todos los usuarios de la colleccion
 */
export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        const userModel = userEntity()

        return await userModel.find({ isDelete: false })
    } catch (error) {
        LogError(`[ORM ERROR]: GET All User: ${error}`)
    }
}

// TODO
// GetUSerById
//GetUserByEmail
// Delete User by Id
// Create USeer
