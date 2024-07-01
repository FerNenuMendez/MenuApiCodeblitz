import { Schema } from 'mongoose'
import { randomUUID } from 'crypto'

export const clientesSchema = new Schema({
    _id: { type: String, default: randomUUID, unique: true, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: Number, unique: true, required: true },
    telefono: { type: Number, required: true },
    mail: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    domicilio: { type: String, required: true },
    nacimiento: { type: Date, },
    eCivil: { type: String },
    _userID: { type: String, unique: true, sparse: true },
    inventario: [{}]
}, {
    strict: 'throw',
    versionKey: false,
})
