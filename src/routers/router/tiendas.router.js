import { Router } from "express";
import { postClienteTiendaController } from "../../controllers/clientes.controller.js";


export const tiendasRouter = Router()

tiendasRouter.post("/", postClienteTiendaController)