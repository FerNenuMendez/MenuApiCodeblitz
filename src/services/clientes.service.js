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

    // async agregarAlInventario(id, data) {
    //     try {
    //         logger.info(`Buscando cliente con id: ${id}`);
    //         const cliente = await this.buscarID(id);
    //         if (!cliente) {
    //             logger.error(`Cliente no encontrado con id: ${id}`);
    //             throw new Error('Cliente no encontrado');
    //         }
    //         logger.info(`Cliente encontrado: ${JSON.stringify(cliente)}`);

    //         cliente.inventario.push(data);
    //         logger.info(`Inventario después de agregar nuevo ítem: ${JSON.stringify(cliente.inventario)}`);

    //         // Usar el campo `id` para la actualización
    //         const clienteActualizado = await clientesDao.updateOne({ id: id }, { inventario: cliente.inventario });
    //         logger.info(`Cliente actualizado: ${JSON.stringify(clienteActualizado)}`);

    //         return clienteActualizado;
    //     } catch (error) {
    //         logger.error(`Error en agregarAlInventario: ${error.message}`);
    //         throw error;
    //     }
    // }

    async buscarTodos() {
        return await clientesDao.readAll();
    }

    async buscarID(id) {
        return await clientesDao.readById(id);
    }

    async buscar(parametro) {
        const clientes = await this.buscarTodos()
        const clientesDB = clientes.payload
        const clienteBuscado = buscarPorMail(parametro)
        return clienteBuscado
    }

    async crearUsuario(datosUsuario, id) {
        const nuevoUsuario = await userDao.create(datosUsuario);
        const clienteActualizado = await clientesDao.updateOne({ id: `${id}` }, { _userID: nuevoUsuario.id });
        return clienteActualizado;
    }

    // async crearTienda(id, datosTienda) {
    //     const cliente = await clientesDao.readOne({ id: `${id}`  });
    //     if (!cliente) {
    //         logger.error('Cliente no encontrado')
    //         throw new Error('Cliente no encontrado');
    //     }
    //     const nuevaTienda = await tiendasDao.create(datosTienda);
    //     const usuario = await userDao.readOne({ id: cliente.userID });
    //     if (!usuario) {
    //         logger.error('Usuario no encontrado')
    //         throw new Error('Usuario no encontrado');
    //     }
    //     usuario.tiendas.push({ tiendaID: nuevaTienda.id });
    //     await userDao.updateOne({ id: usuario.id }, { tiendas: usuario.tiendas });
    //     return nuevaTienda;
    // }

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