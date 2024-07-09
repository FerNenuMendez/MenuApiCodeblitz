import { Router } from "express";
import { getController, getControllerID, postController, inventarioPatchController, deleteController } from "../../controllers/clientes.controller.js";

export const clientesRouter = Router()

clientesRouter.get('/', getController)
clientesRouter.get('/id/:id', getControllerID)
clientesRouter.post('/', postController)
clientesRouter.patch('/inv/:id/', inventarioPatchController)
clientesRouter.delete('/id/:id', deleteController)

clientesRouter.get('/test', (req, res) => {
    res.send('Api Funcionando OK')
})
