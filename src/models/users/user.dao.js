import { MODO_EJECUCION } from '../../config/config.js'
import { UserDaoMongoose } from './mongoose/user.dao.mongoose.js'
import { UserDaoFiles } from './files/user.dao.files.js'
import logger from '../../middlewares/logger.js'

const RUTA_USER_JSON = './db/userFile/user.json'

let daoUser

if (MODO_EJECUCION === "online") {
    //SINGLETON
    if (!daoUser) {
        daoUser = new UserDaoMongoose
        logger.info('persistiendo User en: mongoDB')
    }
} else {
    daoUser = new UserDaoFiles(RUTA_USER_JSON)
    console.log('persistiendo User en: sistema de archivos')
}
export function getDaoUser() {
    return daoUser
}