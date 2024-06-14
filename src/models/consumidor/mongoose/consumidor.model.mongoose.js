import { Schema } from 'mongoose'
import { randomUUID } from 'crypto'

export const consumidorSchema = new Schema({
    id: { type: String, default: randomUUID, unique: true, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: Number, unique: true, required: true },
    telefono: { type: Number, required: true },
    mail: { type: String, unique: true, required: true },
    domicilio: { type: String, required: true },
    nacimiento: { type: Date, },
    eCivil: { type: String },
    userID: { type: Schema.Types.ObjectId, ref: 'User', },
    inventario: [{}]
}, {
    strict: 'throw',
    versionKey: false,
})
