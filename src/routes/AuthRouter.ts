import express, { Request, Response } from 'express'
import { AuthController } from '../controller/AuthController'
import { LogInfo } from '../utils/logger'
import { IUser } from '.././domain/IUser.interface'
// Algoritmo de cifrado BCRYPT
import bcrypt from 'bcrypt'
import { IAuth } from '../domain/IAuth.interface'
// Leer JSON Body de las request
import bodyParser from 'body-parser'
const authRouter = express.Router()

let jsonParser = bodyParser.json()

// http://localhost:8000/api/auth/register
authRouter.route('/register')
    .post(jsonParser, async (req: Request, res: Response) => {
        // Obtener datos de usuario del body de la Request con desustructuracion del objeto JSON

        const { name, email, password, age } = req.body

        if (name && email && password && age) {
            // cifrar contraseña con metodo hashSync(contraseña, rondas) de BCRYPT
            const passwordHashed = bcrypt.hashSync(req.body.password, 8)

            // Crear variable usuario que cumpla IUser
            const user: IUser = {
                name: name,
                email: email,
                password: passwordHashed,
                age: age

            }

            // Instanciar controlador
            const controller: AuthController = new AuthController()

            // Crear usuario
            const response = await controller.registerUser(user)
            return res.send(response);
        }

    }
    )

// http://localhost:8000/api/auth/login
authRouter.route('/login')
    .post(async (req: Request, res: Response) => {
        // Obtener datos de usuario del body de la Request con desustructuracion del objeto JSON
        const { email, password } = req.body

        if (email && password) {
            // Instanciar controlador
            const controller: AuthController = new AuthController()


            // login
            const auth: IAuth = {
                email: email,
                password: password
            }
            const response = await controller.loginUser(auth)
            // Envio de respuesta
            return res.status(200
            ).send(response)
        }
    }
    )

export default authRouter
