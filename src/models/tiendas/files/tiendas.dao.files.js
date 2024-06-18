// SINGLETON

import { Tiendas } from './tiendas.model.files.js'
import { matches } from '../../utils/utils.js'
import fs from 'fs/promises'

export class TiendasDaoFiles {

    constructor(path) {
        this.path = path
    }

    async readTiendas() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await this.writeTiendas([]);
                return [];
            }
            throw error;
        }
    }

    async writeTiendas(Tiendas) {
        await fs.writeFile(this.path, JSON.stringify(Tiendas, null, 2))
    }

    async create(data) {
        const tiendas = new Tiendas(data)
        const tiendasPOJO = tiendas.toPOJO()
        const Tiendax = await this.readTiendas()
        Tiendax.push(tiendasPOJO)
        await this.writeTiendas(Tiendax)
        return tiendasPOJO
    }

    async readOne(query) {
        const Tiendas = await this.readTiendas()
        const buscado = Tiendas.find(matches(query))
        return buscado
    }

    async readMany(query) {
        const Tiendas = await this.readTiendas()
        const buscados = Tiendas.filter(matches(query))
        return buscados
    }

    async updateOne(query, data) {
        const tiendas = await this.readTiendas();
        const indexBuscado = tiendas.findIndex(matches(query));
        if (indexBuscado !== -1) {
            const tiendasActualizado = { ...tiendas[indexBuscado], ...data };
            tiendas[indexBuscado] = tiendasActualizado;
            await this.writeTiendas(tiendas);
            return tiendasActualizado;
        }
        return null;
    }

    async updateMany(query, data) {
        throw new Error('METHOD NOT IMPLEMENTED')
    }

    async deleteOne(query) {
        const Tiendas = await this.readTiendas()
        const indexBuscado = Tiendas.findIndex(matches(query))
        if (indexBuscado !== -1) {
            const [buscado] = Tiendas.splice(indexBuscado, 1)
            await this.writeTiendas(Tiendas)
            return buscado
        }
        return null
    }

    async deleteMany(query) {
        throw new Error('METHOD NOT IMPLEMENTED')
    }
}