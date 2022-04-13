/* eslint-disable indent */
import { Get, Route, Tags, Query, Delete, Post, Put } from 'tsoa'
import { IUsersController } from './interfaces/index'
import { LogSucess, LogError, LogWarning } from '../../src/utils/logger'
import { getAllUsers, getUserById, deleteUserById, createUser, updateUser } from '../domain/orm/User.orm'
import { BasicResponse } from './types'

@Route('api/users')
@Tags('UserController')
export class UserController implements IUsersController {
    /**
     *
     * @param id {string} id del usuario a obtener (opcional)
     * @returns Todos los uuarios o usuario que corresponde con id del parametro
     */
    @Get('/')
    public async geUsers(@Query() id?: string): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucess('[api/users] Get user By id')
            response = await getUserById(id)
        } else {
            LogSucess('[api/users] Get all Users Request')
            response = await getAllUsers()
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
                    message: `User by id ${id} deleted succesfully`
                }
            })
        } else {
            LogWarning('[api/users] Delete user Request without ID')
            response = { message: 'Debe proporcionar un id de usuario' }
        }

        return response
    }

    @Post('/')
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

    @Put('/')
    public async updateUser(id: string, user: any): Promise<any> {
        let response: any = ''
        if (id) {
            LogSucess('[api/users] Update User By id')
            await updateUser(id, user).then((r) => {
                response = {
                    message: `User with id ${id} updated succesfully`
                }
            })
        } else {
            LogWarning('[api/users] Updating user Request without ID')
            response = { message: 'Debe proporcionar un id de usuario' }
        }

        return response
    }
}
