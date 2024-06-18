import { MODO_EJECUCION } from '../../config/config.js'
import { ConsumidorDaoMongoose } from './mongoose/consumidor.dao.mongoose.js'
import { ConsumidorDaoFiles } from './files/clientes.dao.files.js'
import logger from '../../middlewares/logger.js'

const RUTA_CONSUMIDOR_JSON = './db/consumidorFile/consumidor.json'

let daoConsumidor

if (MODO_EJECUCION === "online") {
    //SINGLETON
    if (!daoConsumidor) {
        daoConsumidor = new ConsumidorDaoMongoose
        logger.info('persistiendo Consumidor en: mongoDB')
    }
} else {
    daoConsumidor = new ConsumidorDaoFiles(RUTA_CONSUMIDOR_JSON)
    logger.info('persistiendo Consumidor en: sistema de archivos')
}
export function getDaoConsumidor() {
    return daoConsumidor
}
