import { getDaoConsumidor } from '../models/consumidor/consumidor.dao.js'
import { getDaoUser } from '../models/users/user.dao.js'

import logger from '../middlewares/logger.js'



const consumidorDao = await getDaoConsumidor()
const userDao = getDaoUser()


class ConsumidorService {
    async registrar(data) {
        return await consumidorDao.create(data)
    }
    async agregarAlInventario(clienteId, data) {
        const cliente = await consumidorDao.readOne({ _id: clienteId });
        if (!cliente) {
            logger.error('Cliente no encontrado')
            throw new Error('Cliente no encontrado');
        }
        cliente.inventario.push(data);
        const clienteActualizado = await consumidorDao.updateOne({ _id: clienteId }, { inventario: cliente.inventario });
        return clienteActualizado;
    }

    async buscarTodos() {
        return await consumidorDao.readAll();
    }

    async buscarID(id) {
        return await consumidorDao.readById(id);
    }

    async buscar(parametro) {
        const query = {};
        for (const key in parametro) {
            if (parametro[key] !== undefined) {
                query[key] = parametro[key];
            }
        }
        return await consumidorDao.readMany(query);
    }

    async crearUsuario(datosUsuario, clienteId) {
        const nuevoUsuario = await userDao.create(datosUsuario);
        const clienteActualizado = await consumidorDao.updateOne({ _id: clienteId }, { userID: nuevoUsuario._id });
        return clienteActualizado;
    }


    async darDeBaja(clienteId) {
        const cliente = await consumidorDao.readOne({ _id: clienteId });
        if (!cliente) {
            logger.error('Cliente no encontrado')
            throw new Error('Cliente no encontrado');
        }
        if (cliente.userID) {
            await userDao.deleteOne({ _id: cliente.userID });
        }
        const clienteEliminado = await consumidorDao.deleteOne({ _id: clienteId });
        return clienteEliminado;
    }
}
export const consumidorService = new ConsumidorService()