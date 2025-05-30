const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
            handleExceptions: true
        }),
        new winston.transports.File({
            filename: 'error.log',
            level: 'error',
            handleExceptions: true,
        }),
        new winston.transports.File({ filename: 'combined.log' })
    ],
    exitOnError: false
})

module.exports = logger; 