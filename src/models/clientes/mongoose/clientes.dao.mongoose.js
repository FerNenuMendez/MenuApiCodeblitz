import { model } from 'mongoose'
import { clientesSchema } from './clientes.model.mongoose.js'

const ClientesModel = model('clientes', clientesSchema);
class ClientesDaoMongoose {

    constructor() {
        if (!ClientesDaoMongoose.instance) {
            this.ClientesModel = ClientesModel;
            ClientesDaoMongoose.instance = this;
        }
        return ClientesDaoMongoose.instance;
    }

    async create(data) {
        const cliente = await this.ClientesModel.create(data);
        return cliente.toObject();
    }

    async readOne(query) {
        const cliente = await this.ClientesModel.findOne(query).lean();
        return cliente;
    }

    async readMany(query) {
        return await this.ClientesModel.find(query).lean();
    }

    async updateOne(query, data) {
        const updatedCliente = await this.ClientesModel.findOneAndUpdate(query, data, { new: true }).lean();
        if (!updatedCliente) {
            throw new Error('Cliente not found');
        }
        return updatedCliente;
    }

    async updateMany(query, data) {
        const updatedClientes = await this.ClientesModel.updateMany(query, data).lean();
        return updatedClientes;
    }

    async deleteOne(query) {
        return await this.ClientesModel.findOneAndDelete(query).lean();
    }

    async deleteMany(query) {
        throw new Error('deleteMany method not implemented');
    }

    async readAll() {
        return await this.ClientesModel.find({}).lean();
    }

    async readById(id) {
        const cliente = await this.ClientesModel.findOne(id).lean();
        if (!cliente) {
            throw new Error('Cliente not found');
        }
        return cliente;
    }
}

export { ClientesDaoMongoose };
