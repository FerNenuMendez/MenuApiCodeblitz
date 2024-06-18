import { clientesService } from "../services/clientes.service.js";
import logger from "../middlewares/logger.js"
import { capitalize } from "../models/utils/utils.js";


export async function getController(req, res, next) {
    try {
        const clientes = await clientesService.buscarTodos()
        //console.log(clientes);
        logger.info(clientes)
        res.created(clientes)
    } catch (error) {
        next(error)
        logger.error(error)
    }
}
export async function getControllerID(req, res, next) {
    const { id } = req.params;
    try {
        const cliente = await clientesService.buscarID(id)
        logger.info(cliente)
        res.result(cliente)
    } catch (error) {
        next(error)
        logger.error(error)
    }
}
export async function postController(req, res, next) {
    try {
        const data = req.body;
        const cliente = await clientesService.registrar(data);
        logger.info(cliente)
        res.result(cliente)
    } catch (error) {
        next(error)
        logger.error(error)
    }
}
export async function deleteController(req, res, next) {
    const { id } = req.params;
    try {
        const cliente = await clientesService.darDeBaja(id)
        res.result(cliente)
    } catch {
        next(error)
        logger.error(error)
    }
}