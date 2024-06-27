import { Router, json, urlencoded } from 'express'
import { respuestasMejoradas } from '../middlewares/respuestasMejoradas.js'
import { manejoDeErrores } from '../middlewares/manejoDeErrores.js'
import { clientesRouter } from './router/clientes.router.js'


export const apiRouter = Router()

apiRouter.use(respuestasMejoradas)
apiRouter.use(manejoDeErrores)
apiRouter.use(json())
apiRouter.use(urlencoded({ extended: true }))

apiRouter.use('/clientes', clientesRouter)
apiRouter.use('/consumidor', consumidorRouter)


