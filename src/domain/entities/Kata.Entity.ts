import mongoose from 'mongoose'
import { userEntity } from './User.entity'

export const kataEntity = () => {
    const userSchema = new mongoose.Schema({
        Name: String,
        Description: String,
        Level: Number,
        User: userEntity,
        Date: Date,
        Valoration: Number,
        Chances: Number

    })

    return mongoose.model('Katas', userSchema)
}
