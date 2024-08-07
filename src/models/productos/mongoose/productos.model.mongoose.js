import { Schema } from 'mongoose'
import { randomUUID } from 'crypto'

export const productosSchema = new Schema({
    nombre: { type: String, required: true },
    foto: { type: String },
    precio: { type: Number },
    stock: { type: Number },
    descripcion: { type: String },
    estado: { type: String },
    tiendaID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tiendas' }],
    inventario: [{}]

}, {
    strict: 'throw',
    versionKey: false,
})