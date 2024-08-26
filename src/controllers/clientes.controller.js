import { clientesService } from "../services/clientes.service.js";
import logger from "../middlewares/logger.js"


//BUSCAR TODOS LOS CLIENTES
export async function getController(req, res, next) {
    try {
        const clientes = await clientesService.buscarTodos()
        logger.info(JSON.stringify("Clientes:"))
        logger.info(JSON.stringify(clientes))
        res.result(clientes)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
//BUSCAR POR ID
export async function getControllerID(req, res, next) {
    try {
        const { id } = req.params;
        const cliente = await clientesService.buscarID(id)
        logger.info(JSON.stringify("Cliente Encontrado:"))
        logger.info(JSON.stringify(cliente))
        res.result(cliente)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
//BUSCAR POR MAIL
export async function getControllerMail(req, res, next) {
    try {
        const { mail } = req.params;
        const cliente = await clientesService.buscarLogueo(mail)
        logger.info("Cliente Encontrado:")
        logger.info(JSON.stringify(cliente))
        res.result(cliente)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
//CREAR USUARIO
export async function postController(req, res, next) {
    try {
        const data = req.body;
        const cliente = await clientesService.registrar(data);
        logger.info("Cliente Creado:")
        logger.info(JSON.stringify(cliente))
        res.created(cliente)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}
//CREAR TIENDA
export const postClienteTiendaController = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const nuevaTienda = await clientesService.agregarTienda(id, data);
        res.status(201).json(nuevaTienda);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//ELIMINAR CLIENTES
export async function deleteController(req, res, next) {
    const { id } = req.params;
    try {
        const cliente = await clientesService.darDeBaja(id)
        logger.info(JSON.stringify("Cliente Eliminado:"))
        logger.info(JSON.stringify(cliente))
        res.deleted(cliente)
    } catch {
        logger.error(error)
        next(error)
    }
}