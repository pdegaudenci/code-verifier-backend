import { LogError } from '../../utils/logger'
import { kataEntity } from '../entities/Kata.Entity'

export const getAllUsers = async (): Promise<any[] | undefined> => {
    try {
        const kataModel = kataEntity()

        return await kataModel.find({ isDelete: false })
    } catch (error) {
        LogError(`[ORM ERROR]: GET All User: ${error}`)
    }
}
