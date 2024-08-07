import { Schema } from 'mongoose'
import { randomUUID } from 'crypto'

export const tiendasSchema = new Schema({
    nombre: { type: String, required: true },
    logo: { type: String },
    foto: { type: String },
    descripcion: { type: String },
    telefono: { type: Number },
    mail: { type: String, unique: true, required: true },
    domicilio: { type: String, required: true },
    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'producto' }],
    ingreso: { type: Date, required: true },
    estado: { type: String },
    inventario: [{}]
}, {
    strict: 'throw',
    versionKey: false,
})