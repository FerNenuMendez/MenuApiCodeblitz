//SINGLETON

import { Cliente } from './clientes.model.file.js'; // Asegúrate de que el nombre del archivo sea correcto
import { matches } from '../../utils/utils.js';
import fs from 'fs/promises';

export class ClientesDaoFiles {
    constructor(path) {
        this.path = path;
    }

    async readClientes() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await this.writeClientes([]);
                return [];
            }
            throw error;
        }
    }

    async writeClientes(clientes) {
        await fs.writeFile(this.path, JSON.stringify(clientes, null, 2));
    }

    async create(data) {
        const cliente = new Cliente(data);
        const clientePojo = cliente.toPOJO();
        const clientes = await this.readClientes();
        clientes.push(clientePojo);
        await this.writeClientes(clientes);
        return clientePojo;
    }

    async readOne(query) {
        const clientes = await this.readClientes();
        return clientes.find(matches(query));
    }

    async readMany(query) {
        const clientes = await this.readClientes();
        return clientes.filter(matches(query));
    }

    async updateOne(query, data) {
        const clientes = await this.readClientes();
        const indexBuscado = clientes.findIndex(matches(query));
        if (indexBuscado !== -1) {
            const clienteActualizado = { ...clientes[indexBuscado], ...data };
            clientes[indexBuscado] = clienteActualizado;
            await this.writeClientes(clientes);
            return clienteActualizado;
        }
        return null;
    }

    async updateMany(query, data) {
        const clientes = await this.readClientes();
        let updatedCount = 0;
        clientes.forEach((cliente, index) => {
            if (matches(query)(cliente)) {
                clientes[index] = { ...cliente, ...data };
                updatedCount++;
            }
        });
        if (updatedCount > 0) {
            await this.writeClientes(clientes);
        }
        return updatedCount;
    }

    async deleteOne(query) {
        const clientes = await this.readClientes();
        const indexBuscado = clientes.findIndex(matches(query));
        if (indexBuscado !== -1) {
            const [buscado] = clientes.splice(indexBuscado, 1);
            await this.writeClientes(clientes);
            return buscado;
        }
        return null;
    }

    async deleteMany(query) {
        const clientes = await this.readClientes();
        const initialLength = clientes.length;
        const filteredClientes = clientes.filter(cliente => !matches(query)(cliente));
        const deletedCount = initialLength - filteredClientes.length;
        if (deletedCount > 0) {
            await this.writeClientes(filteredClientes);
        }
        return deletedCount;
    }

    async readAll() {
        return await this.readClientes();
    }

    async readById(id) {
        const clientes = await this.readClientes();
        const cliente = clientes.find(cliente => cliente._id === id);
        if (!cliente) {
            throw new Error('Cliente not found');
        }
        return cliente;
    }
}
