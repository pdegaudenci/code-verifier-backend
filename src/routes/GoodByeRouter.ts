import express, { Request, Response } from 'express'
import { ByeController } from '../controller/ByeController'
import { LogInfo } from '../utils/logger'

const byeRouter = express.Router()

byeRouter.route('/').get(async (req: Request, res: Response) => {
    // Obtener query Param (consultas que son recibidas por parametro en la URL)
    const nombre: any = req?.query?.name
    LogInfo(`Query Param : ${nombre}`)

    // Instancia de controlador
    const controller: ByeController = new ByeController()

    // Obtener respuesta
    const response = await controller.getMessage(nombre)

    // Enviar respuesta

    return res.send(response)
})

export default byeRouter
