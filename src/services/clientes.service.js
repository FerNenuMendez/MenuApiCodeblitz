import { getDaoClientes } from '../models/clientes/clientes.dao.js'
import { getDaoTienda } from '../models/tiendas/tienda.dao.js'
import { hashear, buscarPorMail, buscarPorToken } from '../models/utils/utils.js'
import logger from '../middlewares/logger.js'
import sendEmail from '../middlewares/mailer.js';



const clientesDao = await getDaoClientes()
const tiendasDao = await getDaoTienda()


class ClientesService {

    async buscarLogueo(mail) {
        const clientes = await this.buscarTodos();
        const clienteBuscado = buscarPorMail(clientes, mail);
        clienteBuscado.lastLogin = new Date()
        const updateLogin = await clientesDao.update(clienteBuscado._id, { lastLogin: clienteBuscado.lastLogin })
        if (!updateLogin) {
            throw new Error('Error al actualizar el usuario');
        }
        return clienteBuscado;
    }

    async buscarPorToken(token) {
        const clientes = await this.buscarTodos();
        const clienteBuscado = buscarPorToken(clientes, token)
        if (!clienteBuscado) {
            throw new Error('Cliente no encontrado');
        }
        return clienteBuscado;
    }
    async buscarID(id) {
        return await clientesDao.readById(id);
    }

    async buscarTodos() {
        return await clientesDao.readAll();
    }

    async crearUsuario(datosUsuario, id) {
        const nuevoUsuario = await clientesDao.create(datosUsuario);
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
            await clientesDao.deleteOne({ id: cliente._userID });
        }
        const clienteEliminado = await clientesDao.deleteOne({ id: `${id}` });
        return clienteEliminado;
    }

    async registrar(data) {
        data.ingreso = new Date()
        data.password = hashear(data.password)
        const message = `
         <h1>Bienvenido ${data.nombre} a Emporio!</h1>
         <p>Con Emporio podras impulsar tu negocio y lograr nuevos clientes</p>

         `;
        await sendEmail({
            to: data.mail,
            subject: `Bienvenido ${data.nombre}`,
            html: message,
        });
        return await clientesDao.create(data)
    }

}


export const clientesService = new ClientesService()