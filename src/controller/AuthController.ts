import { Get, Post, Delete, Put, Query, Route, Tags } from 'tsoa'
import { IAuthController } from './interfaces'
import { LogError, LogInfo, LogSucess, LogWarning } from '../utils/logger'
import { IUser } from '../domain/IUser.interface'
import { IAuth } from '../domain/IAuth.interface'
import { loginUser, registerUser, logoutUser, getUserById } from '../domain/orm/User.orm'
import { AuthResponse, ErrorResponse } from './types'


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
                    message: `User registered succesfully : ${user.email}`

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
    public async loginUser(auth: IAuth): Promise<any> {
        // Autenticacion de usuario y devolver JW Token generado en metodo loginUser
        let response: AuthResponse | ErrorResponse | undefined;
        console.log(`Controlador de Autenticacion: ${auth.email} y pass:${auth.password}`)
        if (auth) {
            /*
                        await loginUser(auth).then(r => {
                            LogSucess(`[api/auth/register] Login user succesfully: ${auth.email}`)
                            response = {
                                message: `User logged succesfully: ${auth.email}`,
                                // Token JWT generado por metodo loginUser
                                token: r.token
                            }
                            
                        }
                        )*/
            let data = await loginUser(auth)

            response = {

                token: data.token,
                id: data.user._id,
                message: `Welcome ${data.user.name} con id ${data.user._id}`
            }

        } else {
            LogWarning('[api/auth/login]Error  Logging need ')
            response = {
                error: '[ERROR LOGIN] Need password and email',
                message: 'Login incorrecto. Se debe proporcionar un email y contraseña validos'
            }
        }
        return response
    }
    @Post("/me")
    public async userData(@Query() id: string): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucess('[api/users] Get user By id')
            response = await getUserById(id)
            // Eliminar la contraseña de la respuesta
            response.password = ''
        }

        return response
    }

    @Post('/logout')
    public async logOutUser(): Promise<any> {
        const response: any = ''
    }
}
