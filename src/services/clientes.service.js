import { getDaoClientes } from '../models/clientes/clientes.dao.js'
import { getDaoTienda } from '../models/tiendas/tienda.dao.js'
import { hashear, buscarPorMail } from '../models/utils/utils.js'
import logger from '../middlewares/logger.js'

const clientesDao = await getDaoClientes()
const tiendasDao = await getDaoTienda()


class ClientesService {
    async agregarTienda(id, data) {
        try {
            if (!data || typeof data !== 'object') {
                throw new TypeError('Datos de la tienda inválidos');
            }

            // Log the data to inspect its content
            logger.info('Datos recibidos para la nueva tienda:', data);

            // Set the ingreso property
            data.ingreso = new Date();
            const nuevaTienda = await tiendasDao.create(data);
            logger.info('Tienda creada:', nuevaTienda);

            const cliente = await clientesDao.readById({ id: id });
            if (!cliente) {
                logger.error('Cliente no encontrado');
                throw new Error('Cliente no encontrado');
            }

            if (!cliente.tiendas) {
                cliente.tiendas = [];
            }
            cliente.tiendas.push(nuevaTienda._id);

            await clientesDao.updateOne({ id: `${id}` }, { tiendas: cliente.tiendas });
            return nuevaTienda;
        } catch (error) {
            logger.error('Error al agregar tienda:', error);
            throw new Error('Error al agregar tienda');
        }
    }

    async buscar(mail) {
        const clientes = await this.buscarTodos()
        const clientesDB = clientes
        const clienteBuscado = buscarPorMail(clientesDB, mail)
        if (clienteBuscado === undefined) {
            logger.error('Cliente Undefined')
        }
        return clienteBuscado
    }

    async buscarID(id) {
        return await clientesDao.readById(id);
    }

    async buscarTodos() {
        return await clientesDao.readAll();
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

    async registrar(data) {
        data.ingreso = new Date()
        data.password = hashear(data.password)
        return await clientesDao.create(data)
    }

}


export const clientesService = new ClientesService()