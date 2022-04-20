import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'Express'
import dotenv from 'dotenv'

// Leer variables de entorno del archivo .env
dotenv.config();
let sercretKey = process.env.SECRET_KEY || 'MYSECRETKEY'
/**
 * 
 * @param req Peticion original del cliente que ingresa al middleware para la validaciond del token
 * @param res Respuesta a la validacion del token
 * @param next Funcion a ejecutar si la validacion fue correcta
 * @returns Error de autenticacion o acceso a ruta protegida
 */
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    // Verifica Cabecera de la peticion del cliente (Propiedad: xs-access-token)
    const token: any = req.headers['xs-access-token']
    console.log(token)
    if (!token) {
        return res.status(403).send({
            authenticationError: 'Failed. Token missing',
            message: 'No Autorizado para acceder al recurso'
        })
    }
    // Verificar Token
    jwt.verify(token, sercretKey, (error: any, decoded: any) => {
        // En caso de error
        if (error) {
            return res.status(500).send({
                authenticationError: 'JWT verification failed',
                message: 'Failed to verify JWT Token in request'
            })
        }
        // Si JWT Token es valido 
        // PErmite accede las rutas protegidas o endpoint solicitado (Ejecuta el segundo parametro de get() de rutas de Auth)
        next()
    })
}
