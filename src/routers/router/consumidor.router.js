import { Router } from "express";
import { getController, getControllerID, postController, deleteController } from "../../controllers/consumidor.controller.js";

export const consumidorRouter = Router()

consumidorRouter.get('/', getController)
consumidorRouter.get('/id/:id', getControllerID)
consumidorRouter.post('/', postController)
consumidorRouter.delete('/:id', deleteController)

consumidorRouter.get('/test', (req, res) => {
    res.send('Api Funcionando OK')
})
