import mongoose from 'mongoose'
import { getDaoClientes } from '../models/clientes/clientes.dao.js'
import { getDaoTienda } from '../models/tiendas/tienda.dao.js'
import { hashear, buscarPorMail, buscarToken, tokenExpirado } from '../models/utils/utils.js'
import logger from '../middlewares/logger.js'
import sendEmail from '../middlewares/mailer.js';



const clientesDao = await getDaoClientes()
const tiendasDao = await getDaoTienda()


class ClientesService {

    async agregarTienda(id, data) {

        const user = await clientesDao.readById({ _id: id });
        data.userID = id
        data.ingreso = new Date()
        data.estado = "Activa"
        const nuevaTienda = await tiendasDao.create(data)
        user.tiendas.push(nuevaTienda._id)
        const userUpdate = await clientesDao.update(id, { tiendas: user.tiendas })
        return nuevaTienda
    }

    async actualizarPassword(userId, newPasswordHashed) {
        try {
            const updateData = {
                password: newPasswordHashed,
                resetPasswordToken: null,
                resetPasswordExpires: null
            };
            const updatedUser = await clientesDao.update(userId, updateData);
            return updatedUser;
        } catch (error) {
            logger.error('Error al actualizar la contraseña:', error.message);
            throw new Error('Error al actualizar la contraseña');
        }
    }

    async actualizarResetPassword(userId, updateData) {
        try {
            const updatedUser = await clientesDao.update(userId, updateData);
            return updatedUser;
        } catch (error) {
            logger.error('Error al actualizar resetPassword:', error);
            throw new Error('Error al actualizar la información de resetPassword');
        }
    }

    async borrarTienda(idUser, idTienda) {
        const user = await clientesDao.readById({ _id: idUser })
        if (!user) {
            throw new Error(`Usuario con ID ${idUser} no encontrado`);
        }
        logger.info(`Borrando tienda con ID: ${idTienda.idT} del usuario con ID: ${idUser}`);
        const tiendaABorrar = await tiendasDao.deleteOne({ _id: idTienda.idT })
        if (!tiendaABorrar) {
            throw new Error(`Tienda con ID ${idTienda.idT} no encontrada`);
        }
        const nuevaTiendas = user.tiendas.filter(obj => obj._id.toString() !== idTienda.idT.toString())
        const updateUser = await clientesDao.update(idUser, { tiendas: nuevaTiendas })
        if (!updateUser) {
            throw new Error('Error al actualizar el Inventario con el nuevo item');
        }
        logger.info(
            `Tienda con ID ${idTienda.idT} eliminada exitosamente del usuario con ID ${idUser}`
        );
        return {
            message: "Tienda eliminada exitosamente",
            tiendaEliminada: idTienda.idT,
        };
    }

    async buscarLogueo(mail) {
        const clientes = await this.buscarTodos();
        const clienteBuscado = buscarPorMail(clientes, mail);
        if (!clienteBuscado) {
            logger.info(`Usuario no encontrado con el mail: ${mail}`);
            return null; // Retorna null si no se encuentra el cliente
        }
        logger.info(`Usuario encontrado: ${JSON.stringify(clienteBuscado, null, 2)}`)
        clienteBuscado.lastLogin = new Date()
        const updateLogin = await clientesDao.update(clienteBuscado._id, { lastLogin: clienteBuscado.lastLogin })
        if (!updateLogin) {
            throw new Error('Error al actualizar el usuario');
        }
        return clienteBuscado;
    }

    async buscarPorToken(token) {
        try {
            const clientes = await this.buscarTodos();
            const clienteBuscado = buscarToken(clientes, token);
            if (!clienteBuscado) {
                logger.info(`Usuario no encontrado con el token: ${token}`);
                return null; // Retorna null si no se encuentra el cliente
            }
            return clienteBuscado;
        } catch (error) {
            logger.error('Error en buscarPorToken:', error.message);
            throw error;
        }
    }

    async buscarID(id) {
        return await clientesDao.readById(id);
    }

    async buscarTodos() {
        return await clientesDao.readAll();
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