import mongoose from 'mongoose'
import { IUser } from '../IUser.interface'

// Creacion de esquema de estructura de datos para tratar datos de usuario en la BD
// Los elementos de la colleccion Users siguen esta estructura
export const userEntity = () => {
    // En el esquema no introduzco id, porque mongodb lo crea 
    const userSchema = new mongoose.Schema<IUser>({
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        age: { type: Number, required: true },
        katas: { type: [], required: true }
    })

    // retorna modelo asignado a la collecion users que cumplen el esquema si es la primera vez que se ejecuta o retorno el modelo existente
    return mongoose.models.users || mongoose.model<IUser>('users', userSchema)
}
