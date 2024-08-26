import { getDaoClientes } from '../models/clientes/clientes.dao.js'
import { getDaoTienda } from '../models/tiendas/tienda.dao.js'
import { hashear, buscarPorMail, buscarToken, tokenExpirado } from '../models/utils/utils.js'
import logger from '../middlewares/logger.js'
import sendEmail from '../middlewares/mailer.js';



const clientesDao = await getDaoClientes()
const tiendasDao = await getDaoTienda()


class ClientesService {

    async actualizarPassword(userId, newPassword) {
        try {
            const updatedUser = await this.userDao.updateOne({ _id: userId }, { password: newPassword });
            return updatedUser;
        } catch (error) {
            logger.error('Error al actualizar la contraseña', error);
            throw new Error('Error al actualizar la contraseña');
        }
    }

    async buscarLogueo(mail) {
        const clientes = await this.buscarTodos();
        const clienteBuscado = buscarPorMail(clientes, mail);
        logger.info(`Usuario encontrado: ${JSON.stringify(user, null, 2)}`)
        clienteBuscado.lastLogin = new Date()
        const updateLogin = await clientesDao.update(clienteBuscado._id, { lastLogin: clienteBuscado.lastLogin })
        if (!updateLogin) {
            throw new Error('Error al actualizar el usuario');
        }
        return clienteBuscado;
    }

    async buscarPorToken(token) {
        const clientes = await this.buscarTodos();
        const clienteBuscado = buscarToken(clientes, token)
        if (!clienteBuscado) {
            logger.error('Cliente no encontrado')
            throw new Error('Cliente no encontrado');
        }
        if (tokenExpirado(clienteBuscado.resetPasswordTokenFechaExpiracion)) {
            logger.error('Token expirado');
            throw new Error('Token expirado');
        }
        return clienteBuscado;
    }

    async buscarID(id) {
        return await clientesDao.readById(id);
    }

    async buscarTodos() {
        return await clientesDao.readAll();
    }

    // async crearUsuario(datosUsuario, id) {
    //     const nuevoUsuario = await clientesDao.create(datosUsuario);
    //     const clienteActualizado = await clientesDao.updateOne({ id: `${id}` }, { _userID: nuevoUsuario.id });
    //     return clienteActualizado;
    // }

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
         <p>Con Emporio podras impulsar tu negocio y lograr nuevos clientes</p>`;
        await sendEmail({
            to: data.mail,
            subject: `Bienvenido ${data.nombre}`,
            html: message,
        });
        return await clientesDao.create(data)
    }

    async updatearData(id, campo, data) {
        if (!id || !campo) {
            throw new Error("ID y campo son necesarios para actualizar un cliente");
        }
        const updateData = {};
        updateData[campo] = data;
        const clienteActualizado = await clientesDao.update(id, updateData);
        return clienteActualizado;
    }
}


export const clientesService = new ClientesService()