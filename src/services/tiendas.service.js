import { getDaoTienda } from "../models/tiendas/tienda.dao.js";
import logger from '../middlewares/logger.js'

const tiendasDao = getDaoTienda()

class TiendaService {
    async registrar(data) {
        return await tiendasDao.create(data)
    }
    async buscarTodas() {
        return await tiendasDao.readAll();
    }
    async buscarID(id) {
        return await tiendasDao.readById(id);
    }
    async buscar(parametro) {
        const query = {};
        for (const key in parametro) {
            if (parametro[key] !== undefined) {
                query[key] = parametro[key];
            }
        }
        return await tiendasDao.readMany(query);
    }
    async agregarAlInventario(tiendasId, data) {
        const tiendas = await tiendasDao.readOne({ _id: tiendasId });
        if (!tiendas) {
            logger.error('tienda no encontrada')
            throw new Error('tienda no encontrada');
        }
        tiendas.inventario.push(data);
        const tiendasActualizado = await tiendasDao.updateOne({ _id: tiendasId }, { inventario: tiendas.inventario });
        return tiendasActualizado;
    }
}

export const tiendaService = new TiendaService()