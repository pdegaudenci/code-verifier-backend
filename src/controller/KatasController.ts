/* eslint-disable indent */

import { IKatasInterface } from './interfaces'
import {
    getAllKatas,
    getKataById,
    createKata,
    updateKata,
    deleteKataById,
    getKataByLevel,
    getMostRecent,
    getOrderedByChances,
    scoreKata,
    getOrderedByScore
} from '../../src/domain/orm/Kata.orm'
import { LogSucess, LogError, LogWarning } from '../utils/logger'
import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa'
import { IKata } from '.././domain/IKata.interface'

@Route('api/katas')
@Tags('KatasController')
export class KatasController implements IKatasInterface {


    @Get('/')
    public async getKatas(page: number, limit: number, id?: string): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucess('[api/katas] Get kata By id')
            response = await getKataById(id)
        } else {
            LogSucess('[api/katas] Get all Katas Request')
            response = await getAllKatas(page, limit)
        }

        return response
    }

    @Delete('/')
    public async deleteKata(id?: string): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucess('[api/katas] Delete kata By id Request')
            await deleteKataById(id)
            response = {
                message: `Kata with id ${id} was deleted succesfully`
            }
        } else {
            LogWarning('[api/katas] Delete kata Request without ID')
            response = {
                message: 'You have provide a id to delete one kata'
            }
        }
        return response
    }

    @Post('/')
    public async createKata(kata: IKata): Promise<any> {
        let response: any = kata
        LogSucess('[api/katas] Create new Kata ')
        if (kata) {
            await createKata(kata).then((r) => {
                LogSucess(`[api/katas] Create new Kata kata:${kata.name} `)
                response = {
                    message: `Kata with name ${kata.name} was created successfully`
                }
            })

        }
        else {
            LogWarning('[api/katas] Needs to provide a valid Kata Entity')
            response = {
                message: 'Debe proporcionar un kata valido'
            }
        }

        return response
    }

    @Put('/')
    public async updateKata(id: string, kata: IKata): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucess('[api/katas] Update Kata By id')
            await updateKata(id, kata).then((r) => {
                response = {
                    message: `kata with id ${id} was updated succesfully`
                }
            })
        } else {
            LogWarning('[api/katas] Updating kata Request without ID')
            response = { message: 'Debe proporcionar un id de kata' }
        }

        return response
    }

    public async getKataByLevel(level: Number): Promise<any> {
        let response: any = ''
        if (level) {
            LogSucess('[api/katas/level] Obtains Katas By level')
            response = await getKataByLevel(level)
        } else {
            LogWarning('[api/katas/level] Obtain kata Request without Level')
            response = { message: 'Error con el nivel ingresado' }
        }

        return response
    }

    public async getFiveMostRecent(): Promise<any> {
        const response = await getMostRecent()
        LogSucess('[api/katas/recent] Obtains most recent Katas')
        return response
    }

    public async scoreKata(id: string, score: Number): Promise<any> {
        let response: any = ''
        if (id && score && (score >= 0) && (score <= 10)) {
            await scoreKata(id, score)
            response = await getKataById(id)
            LogSucess(`[api/katas/average] Scoring kata with id ${id} with score ${score} `)
        } else {
            LogWarning('[api/katas/level] Obtain kata Request without score or id ')
            response = { message: 'Error. id o puntuacion incorrecto. La puntuacion debe ser entre 0 y 10' }
        }

        return response
    }

    public async getKataOrderedByChances(): Promise<any> {
        const response = await getOrderedByChances()
        LogSucess('[api/katas/ordered] Obtains Katas ordered by chances')
        return response
    }

    public async getKatasOrderedByScore(): Promise<any> {


        LogSucess('[api/katas/level] Obtains Katas ordered by score')
        return await getOrderedByScore()


    }
}
