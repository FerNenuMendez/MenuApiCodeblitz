import { getDaoClientes } from '../models/clientes/clientes.dao.js'
import { hashear, buscarPorMail } from '../models/utils/utils.js'

import logger from '../middlewares/logger.js'

const clientesDao = await getDaoClientes()



class ClientesService {

    async registrar(data) {
        data.ingreso = new Date()
        data.password = hashear(data.password)
        return await clientesDao.create(data)
    }

    async buscarTodos() {
        return await clientesDao.readAll();
    }

    async buscarID(id) {
        return await clientesDao.readById(id);
    }

    async buscar(parametro) {
        const clientes = await this.buscarTodos()
        const clientesDB = clientes
        const clienteBuscado = buscarPorMail(clientesDB, parametro)
        if (clienteBuscado === undefined) {
            logger.error('Cliente Undefined')
        }
        return clienteBuscado
    }

    async crearUsuario(datosUsuario, id) {
        const nuevoUsuario = await userDao.create(datosUsuario);
        const clienteActualizado = await clientesDao.updateOne({ id: `${id}` }, { _userID: nuevoUsuario.id });
        return clienteActualizado;
    }

    async darDeBaja(id) {
        const cliente = await clientesDao.readOne({ id: `${id}` });
        if (!cliente) {
            logger.error('Cliente no encontrado')
            throw new Error('Cliente no encontrado');
        }
        if (cliente._userID) {
            await userDao.deleteOne({ id: cliente._userID });
        }
        const clienteEliminado = await clientesDao.deleteOne({ id: `${id}` });
        return clienteEliminado;
    }
}


export const clientesService = new ClientesService()