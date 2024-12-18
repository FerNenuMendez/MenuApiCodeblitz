import { tiendaService } from "../services/tiendas.service.js"
import logger from "../middlewares/logger.js"

//CREAR TIENDA
export async function postNuevaTiendaController(req, res, next) {
    try {
        const { id } = req.params
        const data = req.body
        const nuevaTienda = await tiendaService.crearTienda(id, data)
        logger.info("Tienda Creada:")
        logger.info(JSON.stringify(nuevaTienda))
        res.created(nuevaTienda)
    } catch {
        logger.error(error)
        next(error)
    }
}