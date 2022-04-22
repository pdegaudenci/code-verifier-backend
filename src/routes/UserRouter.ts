/* eslint-disable indent */
import express, { Request, Response } from 'express'
import { UserController } from '../controller/UsersController'
import { LogInfo } from '../utils/logger'

// Middleware de verificacion de token
import { verifyToken } from '../middleware/verifyToken.middleware'
import bodyParser from 'body-parser'
import { IKata, KataLevel } from '../domain/IKata.interface'
import { KatasController } from '../controller/KatasController'
const jsonParser = bodyParser.json();
// Router de Express

const userRouter = express.Router() // Acceder al sistema de enrutado

// http://localhost:8000/api/users
userRouter.route('/')
    .get(verifyToken, async (req: Request, res: Response) => {
        // Obtener query Param (consultas que son recibidas por parametro en la URL) --> id, pagina y limite de paginas a mostrar
        let id: any = req?.query?.id;
        let page: any = req?.query?.page || 1;
        let limit: any = req?.query?.limit || 10;


        LogInfo(`Query Param : ${id}`)

        // Instancia de controlador
        const controller: UserController = new UserController()

        // Obtener respuesta
        // controller.getMessage().then
        const response = await controller.geUsers(page, limit, id)

        // Enviar respuesta

        return res.status(200).send(response)
    })
    // DELETE:
    .delete(verifyToken, async (req: Request, res: Response) => {
        const id: any = req?.query?.id
        LogInfo(`Query Param : ${id}`)

        // Instancia de controlador
        const controller: UserController = new UserController()

        // Obtener respuesta

        const response = await controller.deleteUser(id)

        // Enviar respuesta

        return res.status(response.status).send(response)
    })

    // Actualizar usuario por ID
    .put(verifyToken, async (req: Request, res: Response) => {
        // Obtener datos por Queries params
        const id: any = req?.query?.id
        const name: any = req?.query?.name
        const email: any = req?.query?.email
        const age: any = req?.query?.age
        const katas = req?.query?.katas

        // info
        LogInfo(`Query Params: id: ${id} , nombre: ${name}, email: ${email}, edad: ${age}`)
        const user = {
            name: name,
            email: email,
            age: age,
            katas: katas
        }
        // Instancia de controlador
        const controller: UserController = new UserController()

        // Obtener respuesta
        const response = await controller.updateUser(id, user)

        // Enviar respuesta
        return res.status(response.status).send(response);

    });

// http://localhost:8000/api/users/katas
userRouter.route('/katas')
    .get(verifyToken, async (req: Request, res: Response) => {

        let id: any = req?.query?.id;
        let page: any = req?.query?.page || 1;
        let limit: any = req?.query?.limit || 10;

        // Instancia de controlador
        const controller: UserController = new UserController()

        // Obtener respuesta
        // controller.getMessage().then
        const response = await controller.getKatas(page, limit, id)

        // Enviar respuesta

        return res.status(200).send(response)
    })



/*
Otra forma de obtener parametros --> userRouter.route('/:id_user')
*/
export default userRouter

/* TIPOS DE RESPUESTAS
Obtencion de recursos: 200 OK
Creacion de documentos:201 OK
Borrado: 200 (Entity) /204 (No return)
Actualizacion: 200 (Entity) /204 (No return)
*/

/**
 *  CREAR USUARIO, SE HA SUSITUIDO POR METODO REGISTER DE AUTHCONTROLLER
    .post(async (req: Request, res: Response) => {
        // Obtencion de los datos de los parametros de la request mediante Query param
        const nombre = req?.query?.name
        const email = req?.query?.email
        const edad = req?.query?.age

        const user = {
            name: nombre || 'default',
            email: email || 'default',
            age: edad || 18
        }
        // Instancia de controlador
        const controller: UserController = new UserController()

        // Obtener respuesta

        const response = await controller.createUser(user)

        // Enviar respuesta
        // En este caso devuelve 201 (Usuario creado) , pero no retorna usuario creado
        return res.status(201).send(response)
    })
 */
