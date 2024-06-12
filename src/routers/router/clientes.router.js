import { Router } from "express";
import { postController } from "../../controllers/clientes.controller.js";

export const clientesRouter = Router()

clientesRouter.post('/', postController)

clientesRouter.get('/test', (req, res) => {
    res.send('Api Funcionando OK')
})
