import { User } from './user.model.files.js'
import { matches } from '../../utils/utils.js'
import fs from 'fs/promises'

export class UserDaoFiles {

    constructor(path) {
        this.path = path
    }

    async readUser() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error.code === 'ENOENT') {
                await this.writeUser([]);
                return [];
            }
            throw error;
        }
    }

    async writeUser(User) {
        await fs.writeFile(this.path, JSON.stringify(User, null, 2))
    }

    async create(data) {
        const user = new User(data)
        const userPOJO = user.toPOJO()
        const Users = await this.readUser()
        Users.push(userPOJO)
        await this.writeUser(Users)
        return userPOJO
    }

    async readOne(query) {
        const User = await this.readUser()
        const buscado = User.find(matches(query))
        return buscado
    }

    async readMany(query) {
        const User = await this.readUser()
        const buscados = User.filter(matches(query))
        return buscados
    }

    async updateOne(query, data) {
        const user = await this.readUser();
        const indexBuscado = user.findIndex(matches(query));
        if (indexBuscado !== -1) {
            const userActualizado = { ...user[indexBuscado], ...data };
            user[indexBuscado] = userActualizado;
            await this.writeUser(user);
            return userActualizado;
        }
        return null;
    }

    async updateMany(query, data) {
        throw new Error('METHOD NOT IMPLEMENTED')
    }

    async deleteOne(query) {
        const User = await this.readUser()
        const indexBuscado = User.findIndex(matches(query))
        if (indexBuscado !== -1) {
            const [buscado] = User.splice(indexBuscado, 1)
            await this.writeUser(User)
            return buscado
        }
        return null
    }

    async deleteMany(query) {
        throw new Error('METHOD NOT IMPLEMENTED')
    }
}