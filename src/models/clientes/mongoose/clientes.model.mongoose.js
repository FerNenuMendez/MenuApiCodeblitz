import { Schema, mongoose } from 'mongoose'


export const clientesSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: Number, unique: true, required: true },
    telefono: { type: Number, required: true },
    mail: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    domicilio: { type: String, required: true },
    estado: { type: String },
    ingreso: { type: Date },
    lastLogin: { type: Date },
    nivel: { type: String },
    aux: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    tiendas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tiendas' }],
    inventario: [{}]
}, {
    strict: 'throw',
    versionKey: false,
})

// SACAMOS CUIT EN LA PRUEBA