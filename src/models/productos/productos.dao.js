import { MODO_EJECUCION } from '../../config/config.js'
import { ProductosDaoMongoose } from './mongoose/productos.dao.mongoose.js'
import { ProductosDaoFiles } from './files/productos.dao.files.js'
import logger from '../../middlewares/logger.js'

const RUTA_PRODUCTOS_JSON = './db/productosFile/productos.json'

let daoProducto

if (MODO_EJECUCION === "online") {
    //SINGLETON
    if (!daoProducto) {
        daoProducto = new ProductosDaoMongoose
        logger.info('persistiendo Productos en: mongoDB')
    }
} else {
    daoProducto = new ProductosDaoFiles(RUTA_PRODUCTOS_JSON)
    logger.info('persistiendo Productos en: sistema de archivos')
}
export function getDaoProducto() {
    return daoProducto
}
