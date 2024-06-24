import { Schema } from 'mongoose'
import { randomUUID } from 'crypto'

export const productosSchema = new Schema({
    productoID: { type: String, default: randomUUID, unique: true, required: true },
    nombre: { type: String, required: true },
    foto: { type: String },
    precio: { type: Number },
    stock: { type: Number },
    descripcion: { type: String },
    estado: { type: String },
    tiendaID: { type: String },
    inventario: [{}]

}, {
    strict: 'throw',
    versionKey: false,
})