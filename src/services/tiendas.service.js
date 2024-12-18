import { getDaoTienda } from "../models/tiendas/tienda.dao.js";
import { clientesService } from "./clientes.service.js";
import logger from '../middlewares/logger.js'

const tiendasDao = getDaoTienda()

class TiendaService {

    async buscarID(id) {
        return await tiendasDao.readById(id);
    }
    async buscarTodas() {
        return await tiendasDao.readAll();
    }
    async crearTienda(id, data) {
        const user = await clientesService.buscarID(id)
        data.ingreso = new Date()
        data.estado = "Activa"
        const nuevaTienda = await tiendasDao.create(data)
        user.tiendas.push(nuevaTienda._id)
        const userUpdate = await clientesService.updatearData(id, tiendas, user.tiendas)
        return userUpdate
    }
}

export const tiendaService = new TiendaService()