require('dotenv').config()

const AppConstants = {
    APP_NAME: process.env.APP_NAME || 'Learning MERN',
    JWT_SECRET: process.env.JWT_SECRET,
    SALT_ROUNDS: 10,
    SMTP: {
        HOST: process.env.SMTP_HOST,
        PORT: process.env.SMTP_PORT,
        USER: process.env.SMTP_USER,
        PASS: process.env.SMTP_PASS,
    },
    DB_URI: process.env.DB_URI,
    SERVER_PORT: process.env.SERVER_PORT || 8080,
    SERVER_PORT: process.env.SERVER_HOST || '127.0.0.1',
}

module.exports = AppConstants;