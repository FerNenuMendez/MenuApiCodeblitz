//singleton

import { Producto } from "./productos.model.files";
import { matches } from '../../utils/utils.js'
import fs from 'fs/promises'

export class ProductosDaoFiles {
    constructor(path) {
        this.path = path
    }

    async readProductos() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await this.writeProductos([]);
                return [];
            }
            throw error;
        }
    }
    async writeProductos(Productos) {
        await fs.writeFile(this.path, JSON.stringify(Productos, null, 2))
    }

    async create(data) {
        const productos = new Producto(data)
        const productosPOJO = productos.toPOJO()
        const Productox = await this.readProductos()
        Productox.push(productosPOJO)
        await this.writeProductos(Productox)
        return productosPOJO
    }

    async readOne(query) {
        const Productos = await this.readProductos()
        const buscado = Productos.find(matches(query))
        return buscado
    }

    async readMany(query) {
        const Productos = await this.readProductos()
        const buscados = Productos.filter(matches(query))
        return buscados
    }

    async updateOne(query, data) {
        const productos = await this.readProductos();
        const indexBuscado = productos.findIndex(matches(query));
        if (indexBuscado !== -1) {
            const productosActualizado = { ...productos[indexBuscado], ...data };
            productos[indexBuscado] = productosActualizado;
            await this.writeProductos(productos);
            return productosActualizado;
        }
        return null;
    }

    async updateMany(query, data) {
        throw new Error('METHOD NOT IMPLEMENTED')
    }

    async deleteOne(query) {
        const Productos = await this.readProductos()
        const indexBuscado = Productos.findIndex(matches(query))
        if (indexBuscado !== -1) {
            const [buscado] = Productos.splice(indexBuscado, 1)
            await this.writeProductos(Productos)
            return buscado
        }
        return null
    }
}