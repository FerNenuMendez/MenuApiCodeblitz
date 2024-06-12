import { getDaoClientes } from '../models/clientes/clientes.dao.js'
import { getDaoUser } from '../models/user/user.dao.js'
import { getDaoTiendas } from '../models/tiendas/tienda.dao.js'

const clientesDao = await getDaoClientes()
const userDao = getDaoUser()

class ClientesService {
    async registrar(data) {
        return await clientesDao.create(data)
    }
    async agregarAlInventario(clienteId, data) {
        const cliente = await clientesDao.readOne({ _id: clienteId });
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }
        cliente.inventario.push(data);
        const clienteActualizado = await clientesDao.updateOne({ _id: clienteId }, { inventario: cliente.inventario });
        return clienteActualizado;
    }

    async buscarTodos() {
        return await clientesDao.readAll();
    }

    async buscarID(id) {
        return await clientesDao.readById(id);
    }

    async buscar(parametro) {
        const query = {};
        for (const key in parametro) {
            if (parametro[key] !== undefined) {
                query[key] = parametro[key];
            }
        }
        return await clientesDao.readMany(query);
    }

    async crearUsuario(datosUsuario, clienteId) {
        const nuevoUsuario = await userDao.create(datosUsuario);
        const clienteActualizado = await clientesDao.updateOne({ _id: clienteId }, { userID: nuevoUsuario._id });
        return clienteActualizado;
    }

    async crearTienda(clienteId, datosTienda) {
        const cliente = await clientesDao.readOne({ _id: clienteId });
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }
        const nuevaTienda = await tiendasDao.create(datosTienda);
        const usuario = await userDao.readOne({ _id: cliente.userID });
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        usuario.tiendas.push({ tiendaID: nuevaTienda._id });
        await userDao.updateOne({ _id: usuario._id }, { tiendas: usuario.tiendas });
        return nuevaTienda;
    }

    async darDeBaja(clienteId) {
        const cliente = await clientesDao.readOne({ _id: clienteId });
        if (!cliente) {
            throw new Error('Cliente no encontrado');
        }
        if (cliente.userID) {
            await userDao.deleteOne({ _id: cliente.userID });
        }
        const clienteEliminado = await clientesDao.deleteOne({ _id: clienteId });
        return clienteEliminado;
    }
}
export const clientesService = new ClientesService()