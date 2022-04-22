import express, { Request, Response } from 'express'
import { AuthController } from '../controller/AuthController'
import { IUser } from '.././domain/IUser.interface'
// Algoritmo de cifrado BCRYPT
import bcrypt from 'bcrypt'
import { IAuth } from '../domain/IAuth.interface'
// Leer JSON Body de las request
import bodyParser from 'body-parser'
// Middleware
import { verifyToken } from '../middleware/verifyToken.middleware'
const authRouter = express.Router()

// Middleware para leer JSON Body
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
                age: age,
                katas: []

            }

            // Instanciar controlador
            const controller: AuthController = new AuthController()

            // Crear usuario
            const response = await controller.registerUser(user)
            return res.send(response);
        }

        else {
            return res.status(400).send({
                message: "[ERROR user data missing] user can not be registered"
            })
        }

    }
    )

// http://localhost:8000/api/auth/login
authRouter.route('/login')
    .post(jsonParser, async (req: Request, res: Response) => {
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
            return res.status(200).send(response)
        }
        else {
            return res.status(400).send({
                message: "[ERROR user data missing] user can not be login"
            })
        }
    })

// Ruta protegida por middleware VerifyToken
// http://localhost:8000/api/auth/me --> Informacion de usuario
authRouter.route("/me")
    .get(verifyToken, async (req: Request, res: Response) => {
        // Obtener ID de usuario
        let id: any = req?.query?.id;
        if (id) {
            const controller: AuthController = new AuthController();

            // Obtener respuesta
            let response: any = await controller.userData(id);

            // Si usuario esta autorizado
            return res.status(200).send(response);

        }
        else {
            return res.status(401).send({
                message: `No Authorized`
            })
        }

    })
export default authRouter
