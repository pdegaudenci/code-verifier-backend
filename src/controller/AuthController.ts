import { Get, Post, Delete, Put, Query, Route, Tags } from 'tsoa'
import { IAuthController } from './interfaces'
import { LogError, LogInfo, LogSucess, LogWarning } from '../utils/logger'
import { IUser } from '../domain/IUser.interface'
import { IAuth } from '../domain/IAuth.interface'
import { loginUser, registerUser, logoutUser } from '../domain/orm/User.orm'

@Route('/api/auth')
@Tags('AuthController')
export class AuthController implements IAuthController {
    /**
     * Registro de nuevo usuario
     * @param user {IUser}  Datos de usuario a registrar que contenga los atributos de IUser
     * @returns {Promise} Mensaje de usuario creado correctamente || Error al crear usuario
     */
    @Post('/register')
    public async registerUser(user: IUser): Promise<any> {
        let response: any = ''
        if (user) {
            LogSucess('[api/auth/register] Register new user ')
            await registerUser(user).then((r) => {
                response = {
                    status: 204,
                    message: `User registered succesfully : ${user}`

                }
            })
        } else {
            LogWarning('[api/auth/register]Error  Registiring user')
            response = {
                status: 400,
                message: 'Debe proporcionar un usuario'
            }
        }
        return response
    }

    /**
   *
   * @param auth
   */
    @Post('/login')
    public async loginUser(auth: IAuth) {
        // Autenticacion de usuario y devolver JW Token generado en metodo loginUser
        let response: any = ''
        if (auth) {

            await loginUser(auth).then(r => {
                LogSucess(`[api/auth/register] Login user succesfully: ${auth}`)
                response = {
                    message: `User logged succesfully: ${auth.email}`,
                    // Token JWT generado por metodo loginUser
                    token: r.token
                }
            })
        } else {
            LogWarning('[api/auth/login]Error  Logging need ')
            response = {
                status: 401,
                message: 'Login incorrecto. Se debe proporcionar un email y contraseña validos'
            }
        }
        return response
    }

    @Post('/logout')
    public async logOutUser(): Promise<any> {
        const response: any = ''
    }
}
