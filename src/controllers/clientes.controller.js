import { clientesService } from "../services/clientes.service.js";
import logger from "../middlewares/logger.js"



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

export async function getControllerMail(req, res, next) {
    try {
        const { mail } = req.params;
        const cliente = await clientesService.buscar(mail)
        logger.info(JSON.stringify("Cliente Encontrado:"))
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
        logger.info(JSON.stringify("Cliente Creado:"))
        logger.info(JSON.stringify(cliente))
        res.created(cliente)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

// export async function inventarioPatchController(req, res, next) {
//     try {
//         const { clienteId } = req.params;
//         const inventarioData = req.body;
//         logger.info(`Añadiendo al inventario del cliente con id: ${clienteId}`);
//         const clienteActualizado = await clientesService.agregarAlInventario(clienteId, inventarioData);
//         logger.info(JSON.stringify("Cliente Actualizado"));
//         logger.info(JSON.stringify(clienteActualizado));
//         res.result(clienteActualizado);
//     } catch (error) {
//         logger.error(error);
//         next(error);
//     }
// }

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