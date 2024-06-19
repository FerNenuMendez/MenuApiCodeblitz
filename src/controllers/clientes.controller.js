import { clientesService } from "../services/clientes.service.js";
import logger from "../middlewares/logger.js"
import { capitalize } from "../models/utils/utils.js";


export async function getController(req, res, next) {
    try {
        const clientes = await clientesService.buscarTodos()
        logger.info(JSON.stringify(clientes))
        res.created(clientes)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
export async function getControllerID(req, res, next) {
    const { id } = req.params;
    try {
        const cliente = await clientesService.buscarID(id)
        logger.info(JSON.stringify(cliente))
        res.result(cliente)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
export async function postController(req, res, next) {
    try {
        const data = req.body;
        const cliente = await clientesService.registrar(data);
        logger.info(JSON.stringify(cliente))
        res.result(cliente)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
export async function deleteController(req, res, next) {
    const { id } = req.params;
    try {
        const cliente = await clientesService.darDeBaja(id)
        res.result(cliente)
    } catch {
        logger.error(error)
        next(error)
    }
}