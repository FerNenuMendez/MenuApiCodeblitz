import { MODO_EJECUCION } from '../../config/config.js'


const RUTA_CONSUMIDOR_JSON = './db/consumidorFile/consumidor.json'

let daoConsumidor

if (MODO_EJECUCION === "online") {
    //SINGLETON
    if (!daoConsumidor) {
        daoConsumidor = new ConsumidorDaoMongoose
        console.log('persistiendo Consumidor en: mongoDB')
    }
} else {
    daoConsumidor = new ConsumidorDaoFiles(RUTA_CONSUMIDOR_JSON)
    console.log('persistiendo Consumidor en: sistema de archivos')
}
export function getDaoConsumidor() {
    return daoConsumidor
}
