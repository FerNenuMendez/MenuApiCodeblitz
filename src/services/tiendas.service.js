import { getDaoTienda } from "../models/tiendas/tienda.dao.js";
import logger from '../middlewares/logger.js'

const tiendasDao = getDaoTienda()

class TiendaService {

    async buscarID(id) {
        return await tiendasDao.readById(id);
    }
    async buscarTodas() {
        return await tiendasDao.readAll();
    }
}

export const tiendaService = new TiendaService()