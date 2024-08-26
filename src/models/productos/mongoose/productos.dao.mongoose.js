import { model } from 'mongoose'
import { productosSchema } from './productos.model.mongoose.js'

const ProductosModel = model('producto', productosSchema);

class ProductosDaoMongoose {
    constructor() {
        if (!ProductosDaoMongoose.instance) {
            this.ProductosModel = ProductosModel;
            ProductosDaoMongoose.instance = this;
        }
        return ProductosDaoMongoose.instance;
    }

    async create(data) {
        const producto = await this.ProductosModel.create(data);
        return producto.toObject();
    }

    async readOne(query) {
        const producto = await this.ProductosModel.findOne(query).lean();
        return producto;
    }

    async readMany(query) {
        return await this.ProductosModel.find(query).lean();
    }

    async updateOne(query, data) {
        const updatedproducto = await this.ProductosModel.findOneAndUpdate(query, data, { new: true }).lean();
        if (!updatedproducto) {
            throw new Error('producto not found');
        }
        return updatedproducto;
    }

    async updateMany(query, data) {
        const updatedproductos = await this.ProductosModel.updateMany(query, data).lean();
        return updatedproductos;
    }

    async deleteOne(query) {
        return await this.ProductosModel.findOneAndDelete(query).lean();
    }

    async deleteMany(query) {
        throw new Error('deleteMany method not implemented');
    }

    async readAll() {
        return await this.ProductosModel.find({}).lean();
    }

    async readById(id) {
        const producto = await this.ProductosModel.findById(id).lean();
        if (!producto) {
            throw new Error('producto not found');
        }
        return producto;
    }

}

export { ProductosDaoMongoose };