import { model } from 'mongoose'
import { userSchema } from './user.model.mongoose.js'

const UserModel = model('user', userSchema)

export class UserDaoMongoose {
    constructor() {
        if (!UserDaoMongoose.instance) {
            this.UserModel = UserModel;
            UserDaoMongoose.instance = this;
        }
        return UserDaoMongoose.instance;
    }

    async create(data) {
        const user = await this.UserModel.create(data)
        return user.toObject();
    }

    async readOne(query) {
        return await this.UserModel.findOne(query).lean()
    }

    async readMany(query) {
        return await this.UserModel.find(query).lean()
    }

    async updateOne(query, data) {
        const updatedUser = await this.UserModel.findOneAndUpdate(query, data, { new: true }).lean();
        if (!updatedUser) {
            throw new Error('User not found');
        }
        return updatedUser;
    }

    async updateMany(query, data) {
        throw new Error('METHOD NOT IMPLEMENTED')
    }

    async deleteOne(query) {
        return await this.UserModel.findOneAndDelete(query).lean()
    }

    async deleteMany(query) {
        throw new Error('METHOD NOT IMPLEMENTED')
    }
}