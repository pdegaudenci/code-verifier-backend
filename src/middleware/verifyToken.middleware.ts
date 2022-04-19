import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'Express'

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

    if (!token) {
        return res.status(404).send({
            authenticationError: 'failed. Token error',
            message: 'No Autorizado para acceder al recurso'
        })
    }
    // Verificar Token
    jwt.verify(token, 'SECRET KEY', (error: any, decoded: any) => {
        // En caso de error
        if (error) {
            return res.status(500).send({
                authenticationError: 'JWT verification failed',
                message: 'Failed to verify JWT Token in request'
            })
        }
        // Si JWT Token es valido 
        // PErmite accede las rutas protegidas o endpoint solicitado
        next()
    })
}
