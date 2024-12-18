import { Router } from "express";
import { getController, getControllerID, getControllerMail, postController, postClienteTiendaController, deleteController, deleteTiendaController } from "../../controllers/clientes.controller.js";

export const clientesRouter = Router()

clientesRouter.get("/", getController)
clientesRouter.get("/id/:id", getControllerID)
clientesRouter.get("/mail/:mail", getControllerMail)

clientesRouter.post("/", postController)
clientesRouter.post("/id/:id/nuevatienda/", postClienteTiendaController)

clientesRouter.delete("/id/:id", deleteController)
clientesRouter.delete("/:id/borrartienda", deleteTiendaController)


clientesRouter.get("/test", (req, res) => {
    res.send("Api Funcionando OK")
})
