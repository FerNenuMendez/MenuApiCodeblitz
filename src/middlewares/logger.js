import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, errors } = format;

//formato del msj del log
const formatoLog = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
});


const logger = createLogger({
    format: combine(
        format.colorize(),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        formatoLog
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: './src/logs/app.log' })
    ],
    exceptionHandlers: [
        new transports.File({ filename: './src/logs/exceptions.log' })
    ]
});

export default logger;
