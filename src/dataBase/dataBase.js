import { connect as connectToMongoose } from 'mongoose';
import { MODO_EJECUCION } from '../config/config.js';
import dotenv from 'dotenv';
import logger from "../middlewares/logger.js"

dotenv.config();

const MONGODB_CNX_STR = `${process.env.Mongo__CNX__STR}`;

export async function connect() {
    try {
        if (MODO_EJECUCION === 'online') {
            await connectToMongoose(MONGODB_CNX_STR);
            logger.info('Base de datos conectada a MongoDB');
        } else {
            logger.info('Trabajando con persistencia local');
        }
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
}

// función para desconectar
export async function disconnect() {
    try {
        await mongoose.disconnect();
        logger.info('Desconectado de MongoDB');
    } catch (error) {
        console.error('Error al desconectar de la base de datos:', error);
    }
}
