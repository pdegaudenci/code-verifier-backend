/* eslint-disable indent */
import { LogSucess, LogError } from '../../utils/logger'
import { kataEntity } from '../entities/Kata.Entity'
import { IKata } from '../IKata.interface'
// Acceso a variables de entorno
import dotenv from 'dotenv'
import { userEntity } from '../entities/User.entity'
import { IUser } from '../IUser.interface'
import mongoose from 'mongoose'

// Lectura de variables de entorno
dotenv.config()

export const getAllKatas = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        const kataModel = kataEntity()

        let response: any = {}

        await kataModel.find({ isDelete: false })
            .select('User name Description Chances Level Average solution participants') // proyeccion
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((katas: IKata[]) => {

                response.katas = katas

            })


        await kataModel.count().then((total: number) => {
            response.totalPages = Math.ceil(total / limit) // numero de paginas en funcion del limite
            response.currentPage = Math.ceil(page)

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
        return await kataModel.findById(id).select('User name Description Chances Level Average solution participants')
    } catch (error) {
        LogError(`[ORM ERROR]: GET KATA BY id: ${error}`)
    }

}

// Delete Kata by Id
export const deleteKataById = async (id: String, editor: string): Promise<any | undefined> => {
    try {
        let response;
        const kataModel = kataEntity()

        response = await kataModel.findById(id)
        if (response.User === editor) {
            await kataModel.deleteOne({ _id: id })
            return response = {
                message: `kata with id ${id} was deleted succesfully`
            }
        }
        else {
            return response = {
                message: 'Solo el usuario que creo el kata puede borrarlo'
            }
        }

    } catch (error) {
        LogError(`[ORM ERROR]: Deleting kata by id: ${error}`)
    }
}
// Create Kata
export const createKata = async (kata: IKata): Promise<any | undefined> => {
    let response;
    try {
        const kataModel = kataEntity()

        // Buscar si existe el id de usuario

        let userModel = userEntity();
        await userModel.findOne({ _id: kata.User }).then((user) => {

            kataModel.create(kata).then((kataCreado) => {

                let res = new String(kataCreado._id).toString();

                response = userModel.updateOne({ _id: new mongoose.Types.ObjectId(user._id) }, {
                    $push: {
                        katas: res
                    }
                }).then((res) => {
                    console.log(res)
                })




            })



        }).catch((error) => {


            response = {
                message: `No existe usuario con id ${kata.User}`
            }
            throw new Error(`[ERROR Creating Kata in ORM]: User not found: ${error}`);

        })



    } catch (error) {

        LogError(`[ORM ERROR]: Creating kata : ${error}`)
    }

    return response;
}

// Actualizar kata por ID
export const updateKata = async (id: string, kata: IKata, editor: string): Promise<any | undefined> => {
    let response;
    try {
        const kataModel = kataEntity()

        response = await kataModel.findById(id)
        if (response.User === editor) {
            await kataModel.updateOne(kata)
            return response = {
                message: `kata with id ${id} was updated succesfully`
            }
        }
        else {
            return response = {
                message: 'Solo el usuario que creo el kata puede editarlo'
            }
        }

    } catch (error) {
        LogError(`[ORM ERROR]: Updating kata: ${error}`)
    }
}


// Obttener Katas de un nivel determinado
export const getKataByLevel = async (level: any): Promise<any | undefined> => {
    let response;
    try {

        const kataModel = kataEntity()
        response = await kataModel.find({ Level: level })
        if (response.length === 0) {
            response = {
                ...response,
                message: `No existen katas del nivel : ${level}`
            }
        }

    }
    catch (error) {
        LogError(`[ORM error] Obtaining kata by level: ${error}`)
    }
    console.log(response)
    return response
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

export const resolveKata = async (id: string) => {
    let response
    try {

        const kataModel = kataEntity()
        response = await kataModel.findById(id)

    } catch (error) {
        LogError(`[ORM ERROR]: No existe el kata: ${error}`)
        return response = {
            message: 'No existe el kata'
        }

    }
    console.log(response)
    return response.solution;
}
