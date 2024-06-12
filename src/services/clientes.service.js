import { getDaoClientes } from '../models/clientes/clientes.dao.js'

const clientesDao = await getDaoClientes()

class ClientesService {
    async registrar(data) {
        return await clientesDao.create(data)
    }
}
export const clientesService = new ClientesService()