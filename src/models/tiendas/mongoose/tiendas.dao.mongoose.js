import { model } from 'mongoose'
import { tiendasSchema } from './tiendas.model.mongoose.js'

const TiendasModel = model('tiendas', tiendasSchema)

class TiendasDaoMongoose {
    constructor() {
        if (!TiendasDaoMongoose.instance) {
            this.TiendasModel = TiendasModel;
            TiendasDaoMongoose.instance = this;
        }
        return TiendasDaoMongoose.instance;
    }
    async create(data) {
        const Tiendas = await this.TiendasModel.create(data)
        return Tiendas.toObject()
    }

    async readOne(query) {
        const Tiendas = await this.TiendasModel.findOne(query).lean()
        return Tiendas
    }

    async readMany(query) {
        return await this.TiendasModel.find(query).lean()
    }

    async updateOne(query, data) {
        const updatedTienda = await this.TiendasModel.findOneAndUpdate(query, data, { new: true }).lean();
        if (!updatedTienda) {
            throw new Error('Tienda not found');
        }
        return updatedTienda;
    }

    async updateMany(query, data) {
        const updatedTiendas = await this.TiendasModel.updateMany(query, data).lean();
        return updatedTiendas;
    }

    async deleteOne(query) {
        return await this.TiendasModel.findOneAndDelete(query).lean()
    }

    async deleteMany(query) {
        throw new Error('method not implemented')
    }

    async readAll() {
        return await this.TiendasModel.find({}).lean();
    }

    async readById(id) {
        const tienda = await this.TiendasModel.findById(id).lean();
        if (!tienda) {
            throw new Error('Tienda not found');
        }
        return tienda;
    }
}

export { TiendasDaoMongoose }