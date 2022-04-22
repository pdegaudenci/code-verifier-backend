/* eslint-disable indent */
import { LogSucess, LogError } from '../../utils/logger'
import { kataEntity } from '../entities/Kata.Entity'
import { IKata } from '../IKata.interface'
// Acceso a variables de entorno
import dotenv from 'dotenv'

// Lectura de variables de entorno
dotenv.config()

export const getAllKatas = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        const kataModel = kataEntity()

        let response: any = {}

        await kataModel.find({ isDelete: false })
            .select('User name Descripction Chances Level Average solution participants') // proyeccion
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((katas: IKata[]) => {

                response.katas = katas

            })


        await kataModel.count().then((total: number) => {
            response.totalPages = Math.ceil(total / limit) // numero de paginas en funcion del limite
            response.currentPage = page

        })
        LogSucess('[API/KATAS] Get All Katas with pagination')
        return response;

    } catch (error) {
        LogError(`[ORM ERROR]: GET All Katas: ${error}`)
    }
}

// GetUSerById
export const getKataById = async (id: String): Promise<any | undefined> => {
    try {
        const kataModel = kataEntity()
        return await kataModel.findById(id).select('User name Descripction Chances Level Average')
    } catch (error) {
        LogError(`[ORM ERROR]: GET KATA BY id: ${error}`)
    }
}

// Delete Kata by Id
export const deleteKataById = async (id: String): Promise<any | undefined> => {
    try {
        const kataModel = kataEntity()
        return await kataModel.deleteOne({ _id: id })
    } catch (error) {
        LogError(`[ORM ERROR]: Deleting kata by id: ${error}`)
    }
}
// Create Kata
export const createKata = async (kata: IKata): Promise<any | undefined> => {
    try {
        console.log(kata)
        const kataModel = kataEntity()
        return await kataModel.create(kata)
    } catch (error) {
        LogError(`[ORM ERROR]: Creating kata : ${error}`)
    }
}

// Actualizar kata por ID
export const updateKata = async (id: string, kata: IKata): Promise<any | undefined> => {
    try {
        const kataModel = kataEntity()
        return await kataModel.findByIdAndUpdate(id, kata)
    } catch (error) {
        LogError(`[ORM ERROR]: Updating kata: ${error}`)
    }
}


// Obttener Katas de un nivel determinado
export const getKataByLevel = async (level: any): Promise<any | undefined> => {
    try {
        const kataModel = kataEntity()
        return await kataModel.find({ Level: level })
    } catch (error) {
        LogError(`[ORM error] Obtaining kata by level: ${error}`)
    }
}

// Obtener los 5 katas mas recientes
export const getMostRecent = async (): Promise<any | undefined> => {
    try {
        const kataModel = kataEntity()
        return await kataModel.find().sort({ Date: -1 }).limit(5)
    } catch (error) {
        LogError(`[ORM error] Obtaining most recent katas: ${error}`)
    }
}
export const getOrderedByChances = async (): Promise<any | undefined> => {
    try {
        const kataModel = kataEntity()
        return await kataModel.find().sort({ Chances: -1 })
    } catch (error) {
        LogError(`[ORM error] Obtaining kata ordered by chances : ${error}`)
    }
}

export const scoreKata = async (id: any, score: any): Promise<any | undefined> => {
    try {
        const kataModel = kataEntity()

        await kataModel.updateOne({ _id: id }, { $inc: { Valorations: score, ValorationQuantity: 1 } })
        const kat = await kataModel.findOne({ _id: id })
        const puntuaciones = kat.Valorations
        const cantidadPuntuaciones = kat.ValorationQuantity
        const media = puntuaciones / cantidadPuntuaciones
        return await kataModel.updateOne({ _id: id }, { $set: { Average: media } })
    } catch (error) {
        LogError(`[ORM error] Scoring kata with id ${id}: ${error}`)
    }
}

export const getOrderedByScore = async (): Promise<any> => {
    try {
        const kataModel = kataEntity()
        return await kataModel.find().sort({ Average: -1 })
    } catch (error) {
        LogError(`[ORM error] Obtaining kata ordered by score : ${error}`)
    }
}
