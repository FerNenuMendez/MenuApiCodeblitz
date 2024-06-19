import { model } from 'mongoose'
import { consumidorSchema } from './consumidor.model.mongoose.js'

const ConsumidorModel = model('consumidor', consumidorSchema);
class ConsumidorDaoMongoose {

    constructor() {
        if (!ConsumidorDaoMongoose.instance) {
            this.ConsumidorModel = ConsumidorModel;
            ConsumidorDaoMongoose.instance = this;
        }
        return ConsumidorDaoMongoose.instance;
    }

    async create(data) {
        const consumidor = await this.ConsumidorModel.create(data);
        return consumidor.toObject();
    }

    async readOne(query) {
        const consumidor = await this.ConsumidorModel.findOne(query).lean();
        return consumidor;
    }

    async readMany(query) {
        return await this.ConsumidorModel.find(query).lean();
    }

    async updateOne(query, data) {
        const updatedconsumidor = await this.ConsumidorModel.findOneAndUpdate(query, data, { new: true }).lean();
        if (!updatedconsumidor) {
            throw new Error('consumidor not found');
        }
        return updatedconsumidor;
    }

    async updateMany(query, data) {
        const updatedconsumidors = await this.ConsumidorModel.updateMany(query, data).lean();
        return updatedconsumidors;
    }

    async deleteOne(query) {
        return await this.ConsumidorModel.findOneAndDelete(query).lean();
    }

    async deleteMany(query) {
        throw new Error('deleteMany method not implemented');
    }

    async readAll() {
        return await this.ConsumidorModel.find({}).lean();
    }

    async readById(id) {
        const consumidor = await this.ConsumidorModel.findById(id).lean();
        if (!consumidor) {
            throw new Error('consumidor not found');
        }
        return consumidor;
    }
}

export { ConsumidorDaoMongoose };
