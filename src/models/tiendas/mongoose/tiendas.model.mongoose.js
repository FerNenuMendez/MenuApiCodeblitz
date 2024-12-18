import { Schema, mongoose } from 'mongoose'


export const tiendasSchema = new Schema({
    userID: [{ type: mongoose.Schema.Types.ObjectId, ref: 'cliente' }],
    nombre: { type: String, required: true },
    logo: { type: String },
    foto: { type: String },
    descripcion: { type: String },
    telefono: { type: Number },
    mail: { type: String, unique: true },
    domicilio: { type: String, required: true },
    productos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'producto' }],
    ingreso: { type: Date, required: true },
    estado: { type: String },
    inventario: [{}]
}, {
    strict: 'throw',
    versionKey: false,
})