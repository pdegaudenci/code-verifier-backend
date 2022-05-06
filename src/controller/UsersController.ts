/* eslint-disable indent */
import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa'
import { IUsersController } from './interfaces/index'
import { LogSucess, LogError, LogWarning } from '../../src/utils/logger'
import { getAllUsers, getUserById, deleteUserById, updateUser, getKatasFromUser } from '../domain/orm/User.orm'
import { BasicResponse } from './types'

@Route('api/users')
@Tags('UserController')
export class UserController implements IUsersController {
    @Get("/katas")
    public async getKatas(@Query() page: number, @Query() limit: number, @Query() id?: string): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucess('[api/users/kata] Get kata By user id')
            response = await getKatasFromUser(id, page, limit)

        } else {
            LogSucess('[api/users] Get Katas sin id de usuario')
            response = {
                message: `debe proporcionar ID de usuario`
            }
        }
        console.log(response)
        return response






    }
    /**
     *
     * @param id {string} id del usuario a obtener (opcional)
     * @returns Todos los uuarios o usuario que corresponde con id del parametro
     */
    @Get('/')
    public async geUsers(@Query() page: number, @Query() limit: number, @Query() id?: string): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucess('[api/users] Get user By id')
            response = await getUserById(id)
            // response.password = ''
        } else {
            LogSucess('[api/users] Get all Users Request')
            response = await getAllUsers(page, limit);
            /*
            response = response.map((x: any) => {
                x = {
                    ...x,
                    password: ''
                }
            }
            )*/
        }

        return response
    }

    /*
       public async getUsersById (@Query()id:string): Promise<BasicResponse> {
          LogSucess(`[api/users] Get user By ID ${id}:`)

          return {
            message: `Obteniendo usuario con ID: ${id}`
          }
        }
      */
    /**
        *
        * @param id {string} id del usuario borrar (opcional)
        * @returns informa si borrado fue correcto
        */
    @Delete('/')
    public async deleteUser(@Query() id?: string): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucess('[api/users] Delete User By id')
            await deleteUserById(id).then((r) => {
                response = {
                    status: 204,
                    message: `User by id ${id} deleted succesfully`
                }
            })
        } else {
            LogWarning('[api/users] Delete user Request without ID')
            response = {
                status: 400,
                message: 'Debe proporcionar un id de usuario'
            }
        }

        return response
    }



    @Put('/')
    public async updateUser(id: string, user: any): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucess('[api/users] Update User By id')
            await updateUser(id, user).then((r) => {
                response = {
                    status: 204,
                    message: `User with id ${id} updated succesfully`

                }
            })
        } else {
            LogWarning('[api/users] Updating user Request without ID')
            response = {
                status: 400,
                message: 'Debe proporcionar un id de usuario'
            }
        }

        return response
    }
}

/**
 * SUSTITUIDO POR METODO REGISTERUSER DE AUTHCONTROLLER
 *     @Post('/')
    public async createUser(user: any): Promise<any> {
        let response: any = ''
        LogSucess('[api/users] Creating user')
        await createUser(user).then((r) => {
            response = {
                message: `Created user ${user.name} successfully`
            }
        })
        return response
    }
 */