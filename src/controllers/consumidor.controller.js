import { consumidorService } from "../services/consumidor.service.js";
import logger from "../middlewares/logger.js"

export async function getController(req, res, next) {
    try {
        const consumidor = await consumidorService.buscarTodos()
        logger.info(consumidor)
        res.created(consumidor)
    } catch (error) {
        next(error)
        logger.error(error)
    }
}
export async function getControllerID(req, res, next) {
    const { id } = req.params;
    try {
        const consumidor = await consumidorService.buscarID(id)
        logger.info(consumidor)
        res.result(consumidor)
    } catch (error) {
        next(error)
        logger.error(error)
    }
}
export async function postController(req, res, next) {
    try {
        const data = req.body;
        const consumidor = await consumidorService.registrar(data);
        logger.info(consumidor)
        res.result(consumidor)
    } catch (error) {
        next(error)
        logger.error(error)
    }
}
export async function deleteController(req, res, next) {
    const { id } = req.params;
    try {
        const consumidor = await consumidorService.darDeBaja(id)
        res.result(consumidor)
    } catch {
        next(error)
        logger.error(error)
    }
}