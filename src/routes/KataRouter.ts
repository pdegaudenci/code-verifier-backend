/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import express, { Request, Response } from 'express'
import { KatasController } from '../controller/KatasController'
import { LogInfo } from '../utils/logger'

// Router de Express

const kataRouter = express.Router() // Acceder al sistema de enrutado
// http://localhost:8000/api/users
kataRouter.route('/')
    .get(async (req: Request, res: Response) => {
        // Obtener query Param (consultas que son recibidas por parametro en la URL)
        const id: any = req?.query?.id
        LogInfo(`Query Param : ${id}`)

        // Instancia de controlador
        const controller: KatasController = new KatasController()

        // Obtener respuesta
        // controller.getMessage().then
        const response = await controller.getKatas(id)

        // Enviar respuesta

        return res.send(response)
    })
    // DELETE:
    .delete(async (req: Request, res: Response) => {
        const id: any = req?.query?.id
        LogInfo(`Query Param : ${id}`)

        // Instancia de controlador
        const controller: KatasController = new KatasController()
        // Obtener respuesta

        const response = await controller.deleteKata(id)

        // Enviar respuesta

        return res.send(response)
    })
    // Crear usuario
    .post(async (req: Request, res: Response) => {
        const name: any = req?.query?.name
        const description: any = req?.query?.description
        const level: any = req?.query?.level
        const userName: any = req?.query?.userName
        const userEmail: any = req?.query?.userEmail
        const userAge: any = req?.query?.userAge
        const chances: any = req?.query?.chances
        const valoration: any = req?.query?.valoration
        const valorationQuantity: any = req?.query?.valorationQuantity
        const average: any = req?.query?.average
        const kata = {
            name: name,
            Description: description,
            Level: level,
            User: {
                name: userName,
                email: userEmail,
                age: userAge
            },
            Date: Date.now(),
            Chances: chances,
            Valorations: valoration,
            Average: average,
            ValorationQuantity: valorationQuantity

        }
        // Instancia de controlador
        const controller: KatasController = new KatasController()

        // Obtener respuesta

        const response = await controller.createKata(kata)

        // Enviar respuesta

        return res.send(response)
    })
    // Actualizar usuario por ID
    .put(async (req: Request, res: Response) => {
        const id: any = req?.query.id
        const name: any = req?.query?.name
        const description: any = req?.query?.description
        const level: any = req?.query?.level
        const userName: any = req?.query?.userName
        const userEmail: any = req?.query?.userEmail
        const userAge: any = req?.query?.userAge
        const chances: any = req?.query?.chances
        const valoration: any = req?.query?.valoration
        const valorationQuantity: any = req?.query?.valorationQuantity
        const average: any = req?.query?.average
        const kata = {
            name: name,
            Description: description,
            Level: level,
            User: {
                name: userName,
                email: userEmail,
                age: userAge
            },
            Date: Date.now(),
            Chances: chances,
            Valorations: valoration,
            Average: average,
            ValorationQuantity: valorationQuantity

        }

        // Instancia de controlador
        const controller: KatasController = new KatasController()

        // Obtener respuesta

        const response = await controller.updateKata(id, kata)
        // Enviar respuesta

        return res.send(response)
    })

kataRouter.route('/level')
    .get(async (req: Request, res: Response) => {
        // Obtener query Param (consultas que son recibidas por parametro en la URL)
        const level: any = req?.query?.level

        // Instancia de controlador
        const controller: KatasController = new KatasController()

        // Obtener respuesta
        // controller.getMessage().then
        const response = await controller.getKataByLevel(level)

        // Enviar respuesta

        return res.send(response)
    })

kataRouter.route('/recent')
    .get(async (req: Request, res: Response) => {
        // Instancia de controlador
        const controller: KatasController = new KatasController()

        // Obtener respuesta
        // controller.getMessage().then
        const response = await controller.getFiveMostRecent()

        // Enviar respuesta

        return res.send(response)
    })

kataRouter.route('/ordered')
    .get(async (req: Request, res: Response) => {
        // Instancia de controlador
        const controller: KatasController = new KatasController()

        // Obtener respuesta
        const response = await controller.getKataOrderedByChances()

        // Enviar respuesta

        return res.send(response)
    })
kataRouter.route('/score')
    // Listar  Katas ordenadas de mejor valoradas a menos valoradas (en funcion de su average o media de puntuaciones)
    .get(async (req: Request, res: Response) => {
        // Instancia de controlador
        const controller: KatasController = new KatasController()

        // Obtener respuesta
        const response = await controller.getKataOrderedByScore()

        // Enviar respuesta

        return res.send(response)
    })
    .put(async (req: Request, res: Response) => {
        const id: any = req?.query?.id
        const score: any = req?.query.score
        // Instancia de controlador
        const controller: KatasController = new KatasController()

        // Obtener respuesta
        const response = await controller.scoreKata(id, score)

        // Enviar respuesta

        return res.send(response)
    })
export default kataRouter
