/* eslint-disable indent */
import express, { Request, Response } from 'express'
import { UserController } from '../controller/UsersController'
import { LogInfo } from '../utils/logger'

// Router de Express

const userRouter = express.Router() // Acceder al sistema de enrutado
// http://localhost:8000/api/users
userRouter.route('/')
    .get(async (req: Request, res: Response) => {
        // Obtener query Param (consultas que son recibidas por parametro en la URL)
        const id: any = req?.query?.id
        LogInfo(`Query Param : ${id}`)

        // Instancia de controlador
        const controller: UserController = new UserController()

        // Obtener respuesta
        // controller.getMessage().then
        const response = await controller.geUsers(id)

        // Enviar respuesta

        return res.send(response)
    })
    // DELETE:
    .delete(async (req: Request, res: Response) => {
        const id: any = req?.query?.id
        LogInfo(`Query Param : ${id}`)

        // Instancia de controlador
        const controller: UserController = new UserController()

        // Obtener respuesta

        const response = await controller.deleteUser(id)

        // Enviar respuesta

        return res.send(response)
    })
    // Crear usuario
    .post(async (req: Request, res: Response) => {

        let nombre = req?.query?.name
        let email = req?.query?.email
        let edad = req?.query?.age
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

        return res.send(response)
    })
    //Actualizar usuario por ID
    .put(async (req: Request, res: Response) => {
        // Obtener datos de query param
        let id: any = req?.query?.id
        let name: any = req?.query?.name
        let email: any = req?.query?.email
        let age: any = req?.query?.age

        // info
        LogInfo(`Query Params: id: ${id} , nombre: ${name}, email: ${email}, edad: ${age}`)
        const user = {
            name: name,
            email: email,
            age: age
        }
        // Instancia de controlador
        const controller: UserController = new UserController()

        // Obtener respuesta

        const response = await controller.updateUser(id, user)

        // Enviar respuesta

        return res.send(response)
    })
/*
Otra forma de obtener parametros --> userRouter.route('/:id_user')
*/
export default userRouter
