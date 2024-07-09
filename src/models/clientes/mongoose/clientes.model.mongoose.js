import { Schema } from 'mongoose'
import { randomUUID } from 'crypto'

export const clientesSchema = new Schema({
    id: { type: String, default: randomUUID, unique: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: Number, unique: true, required: true },
    telefono: { type: Number, required: true },
    mail: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    domicilio: { type: String, required: true },
    cuit: { type: String, required: true },
    estado: { type: String },
    ingreso: { type: Date },
    lastLogin: { type: Date },
    nivel: { type: String },
    aux: { type: String },
    tiendas: [{}],
    inventario: [{}]
}, {
    strict: 'throw',
    versionKey: false,
})
