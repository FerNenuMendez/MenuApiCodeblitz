import { Schema } from 'mongoose'
import { randomUUID } from 'crypto'

export const userSchema = new Schema({
    _userID: { type: String, default: randomUUID, unique: true, required: true },
    mail: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    aux: { type: String },
    estado: { type: String },
    ingreso: { type: Date, required: true },
    lastLogin: { type: Date },
    avatar: { type: String },
    nickname: { type: String, unique: true },
    nivel: { type: String },
    //tiendas: [{ tiendaID: { type: Schema.Types.ObjectId, ref: 'Tienda' } }],
    inventario: [{}]
}, {
    strict: 'throw',
    versionKey: false,
})