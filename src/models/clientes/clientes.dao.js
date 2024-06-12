import { MODO_EJECUCION } from '../../config/config.js'
import { ClientesDaoMongoose } from './mongoose/clientes.dao.mongoose.js'
import { ClientesDaoFiles } from './files/clientes.dao.files.js'

const RUTA_CLIENTES_JSON = './db/clientesFile/clientes.json'

let daoClientes

if (MODO_EJECUCION === "online") {
    //SINGLETON
    if (!daoClientes) {
        daoClientes = new ClientesDaoMongoose
        console.log('persistiendo Clientes en: mongoDB')
    }
} else {
    daoClientes = new ClientesDaoFiles(RUTA_CLIENTES_JSON)
    console.log('persistiendo Clientes en: sistema de archivos')
}
export function getDaoClientes() {
    return daoClientes
}
