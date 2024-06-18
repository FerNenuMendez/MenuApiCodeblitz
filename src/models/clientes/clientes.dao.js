import { MODO_EJECUCION } from '../../config/config.js'
import { ClientesDaoMongoose } from './mongoose/clientes.dao.mongoose.js'
import { ClientesDaoFiles } from './files/clientes.dao.files.js'
import logger from '../../middlewares/logger.js'

const RUTA_CLIENTES_JSON = './db/clientesFile/clientes.json'

let daoClientes

if (MODO_EJECUCION === "online") {
    //SINGLETON
    if (!daoClientes) {
        daoClientes = new ClientesDaoMongoose
        logger.info('persistiendo Clientes en: mongoDB')
    }
} else {
    daoClientes = new ClientesDaoFiles(RUTA_CLIENTES_JSON)
    logger.info('persistiendo Clientes en: sistema de archivos')
}
export function getDaoClientes() {
    return daoClientes
}
