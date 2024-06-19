//SINGLETON

import { Consumidor } from './consumidor.model.file.js'; // Asegúrate de que el nombre del archivo sea correcto
import { matches } from '../../utils/utils.js';
import fs from 'fs/promises';

export class ConsumidorDaoFiles {
    constructor(path) {
        this.path = path;
    }

    async readConsumidor() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await this.writeConsumidor([]);
                return [];
            }
            throw error;
        }
    }

    async writeConsumidor(consumidor) {
        await fs.writeFile(this.path, JSON.stringify(consumidor, null, 2));
    }

    async create(data) {
        const consumidor = new Consumidor(data);
        const consumidorPojo = consumidor.toPOJO();
        const consumidores = await this.readConsumidor();
        consumidores.push(consumidorPojo);
        await this.writeConsumidor(consumidor);
        return consumidorPojo;
    }

    async readOne(query) {
        const consumidor = await this.readConsumidor();
        return consumidor.find(matches(query));
    }

    async readMany(query) {
        const consumidor = await this.readConsumidor();
        return consumidor.filter(matches(query));
    }

    async updateOne(query, data) {
        const consumidor = await this.readConsumidor();
        const indexBuscado = consumidor.findIndex(matches(query));
        if (indexBuscado !== -1) {
            const consumidorActualizado = { ...consumidor[indexBuscado], ...data };
            consumidor[indexBuscado] = consumidorActualizado;
            await this.writeConsumidor(consumidor);
            return consumidorActualizado;
        }
        return null;
    }

    async updateMany(query, data) {
        const consumidor = await this.readConsumidor();
        let updatedCount = 0;
        consumidor.forEach((consumidor, index) => {
            if (matches(query)(consumidor)) {
                consumidor[index] = { ...consumidor, ...data };
                updatedCount++;
            }
        });
        if (updatedCount > 0) {
            await this.writeConsumidor(consumidor);
        }
        return updatedCount;
    }

    async deleteOne(query) {
        const consumidor = await this.readConsumidor();
        const indexBuscado = consumidor.findIndex(matches(query));
        if (indexBuscado !== -1) {
            const [buscado] = consumidor.splice(indexBuscado, 1);
            await this.writeConsumidor(consumidor);
            return buscado;
        }
        return null;
    }

    async deleteMany(query) {
        const consumidor = await this.readConsumidor();
        const initialLength = consumidor.length;
        const filteredconsumidor = consumidor.filter(consumidor => !matches(query)(consumidor));
        const deletedCount = initialLength - filteredconsumidor.length;
        if (deletedCount > 0) {
            await this.writeConsumidor(filteredconsumidor);
        }
        return deletedCount;
    }

    async readAll() {
        return await this.readConsumidor();
    }

    async readById(id) {
        const consumidor = await this.readConsumidor();
        const consumidores = consumidor.find(consumidor => consumidor._id === id);
        if (!consumidor) {
            throw new Error('consumidor not found');
        }
        return consumidores;
    }
}
