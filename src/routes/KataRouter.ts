/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */
import express, { Request, Response } from 'express'
import { KatasController } from '../controller/KatasController'
import { LogInfo } from '../utils/logger'

// Middleware para verificar token y proteger rutas
import { verifyToken } from '../middleware/verifyToken.middleware'
// body Parser
import bodyParser from 'body-parser'
import { IKata, KataLevel } from '../domain/IKata.interface'
import { IUser } from '../domain/IUser.interface'

const jsonParser = bodyParser.json()
// Router de Express

const kataRouter = express.Router() // Acceder al sistema de enrutado
// http://localhost:8000/katas
kataRouter.route('/')
    .get(verifyToken, async (req: Request, res: Response) => {
        // Obtener query Param (consultas que son recibidas por parametro en la URL)
        let id: any = req?.query?.id;
        let page: any = req?.query?.page || 1;
        let limit: any = req?.query?.limit || 10;


        // Instancia de controlador
        const controller: KatasController = new KatasController()

        // Obtener respuesta
        // controller.getMessage().then
        const response = await controller.getKatas(page, limit, id)

        // Enviar respuesta

        return res.status(200).send(response)
    })
    // DELETE:
    .delete(verifyToken, async (req: Request, res: Response) => {
        const id: any = req?.query?.id
        LogInfo(`Query Param : ${id}`)

        // Instancia de controlador
        const controller: KatasController = new KatasController()
        // Obtener respuesta

        const response = await controller.deleteKata(id)

        // Enviar respuesta

        return res.status(200).send(response)
    })
    // Crear usuario
    .post(jsonParser, verifyToken, async (req: Request, res: Response) => {
        let response: any = ''

        const name: string = req?.body?.name;
        const description: string = req?.body?.description || '';
        const level: KataLevel = req?.body?.level || KataLevel.BASIC;
        const chances: number = req?.body?.level;
        let valorations = req?.body?.valorations || 0;
        let user: IUser = req?.body?.user;
        let solution: string = req?.body?.solution || '';
        let participants: string[] = req?.body?.participanst || [];
        if (name && description && level && chances && valorations && user && solution && participants) {
            const kata: IKata = {
                name: name,
                Description: description,
                Level: level,
                User: {
                    name: user.name,
                    email: user.email,
                    age: user.age
                },
                Date: Date.now(),
                Chances: chances,
                Valorations: valorations,
                Average: 0,
                ValorationQuantity: 0,
                solution: solution,
                participants: participants

            }

            // Instancia de controlador
            const controller: KatasController = new KatasController()

            // Obtener respuesta

            response = await controller.createKata(kata)
            return res.status(201).send(response)
        }
        else {
            res.status(400).send({
                message: 'ERROR : KATA ENTITY NO VALIDA'
            })
        }
    }
    )
    // Actualizar usuario por ID
    .put(jsonParser, verifyToken, async (req: Request, res: Response) => {
        let response: any = ''
        let id: any = req?.query?.id
        const name: string = req?.body?.name;
        const description: string = req?.body?.description || '';
        const level: KataLevel = req?.body?.level || KataLevel.BASIC;
        const chances: number = req?.body?.level;
        let valorations = req?.body?.valorations || 0;
        let user: IUser = req?.body?.user;
        let solution: string = req?.body?.solution || '';
        let participants: string[] = req?.body?.participanst || [];
        if (id && name && description && level && chances && valorations && user && solution && participants) {
            const kata: IKata = {
                name: name,
                Description: description,
                Level: level,
                User: {
                    name: user.name,
                    email: user.email,
                    age: user.age
                },
                Date: Date.now(),
                Chances: chances,
                Valorations: valorations,
                Average: 0,
                ValorationQuantity: 0,
                solution: solution,
                participants: participants

            }

            // Instancia de controlador
            const controller: KatasController = new KatasController()

            // Obtener respuesta

            response = await controller.updateKata(id, kata)
            return res.send(response)
        }
        else {
            res.status(400).send({
                message: 'ERROR : KATA ENTITY NO VALIDA'
            })
        }


        // Enviar respuesta


        /* POR QUERY PARAMS
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
      */
    })

kataRouter.route('/level')
    .get(verifyToken, async (req: Request, res: Response) => {
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
    .get(verifyToken, async (req: Request, res: Response) => {
        // Instancia de controlador
        const controller: KatasController = new KatasController()

        // Obtener respuesta
        const response = await controller.getKataOrderedByChances()

        // Enviar respuesta

        return res.send(response)
    })
kataRouter.route('/score')
    // Listar  Katas ordenadas de mejor valoradas a menos valoradas (en funcion de su average o media de puntuaciones)
    .get(verifyToken, async (req: Request, res: Response) => {
        // Instancia de controlador
        const controller: KatasController = new KatasController()

        // Obtener respuesta
        const response = await controller.getKatasOrderedByScore()
        // Enviar respuesta

        return res.send(response)
    })
    .put(verifyToken, async (req: Request, res: Response) => {
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
