/* eslint-disable indent */
import express, { Request, Response } from 'express'
import { UserController } from '../controller/UsersController'
import { LogInfo } from '../utils/logger'
import { IUser } from '.././domain/IUser.interface'
// Algoritmo de cifrado BCRYPT
import bcrypt from 'bcrypt'
import { AuthController } from '@/controller/AuthController'

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

        return res.status(200).send(response)
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

        return res.status(response.status).send(response)
    })
    // Crear usuario
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
    // Actualizar usuario por ID
    .put(async (req: Request, res: Response) => {
        // Obtener datos por Queries params
        const id: any = req?.query?.id
        const name: any = req?.query?.name
        const email: any = req?.query?.email
        const age: any = req?.query?.age

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

        return res.status(response.status).send(response)
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
