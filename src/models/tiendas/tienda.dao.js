import { MODO_EJECUCION } from '../../config/config.js'
import { TiendasDaoMongoose } from './mongoose/tiendas.dao.mongoose.js'
import { TiendaDaoFiles } from './files/tiendas.dao.files.js'
import logger from '../../middlewares/logger.js'

const RUTA_TIENDA_JSON = './db/tiendaFile/tienda.json'

let daoTienda

if (MODO_EJECUCION === "online") {
    //SINGLETON
    if (!daoTienda) {
        daoTienda = new TiendasDaoMongoose
        logger.info('persistiendo Tiendas en: mongoDB')
    }
} else {
    daoTienda = new TiendaDaoFiles(RUTA_TIENDA_JSON)
    logger.info('persistiendo Tiendas en: sistema de archivos')
}
export function getDaoTienda() {
    return daoTienda
}