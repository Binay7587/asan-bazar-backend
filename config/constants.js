require('dotenv').config()

const AppConstants = {
    APP_NAME: process.env.APP_NAME || 'Learning MERN',
    JWT_SECRET: process.env.JWT_SECRET,
    SMTP: {
        HOST: process.env.SMTP_HOST,
        PORT: process.env.SMTP_PORT,
        USER: process.env.SMTP_USER,
        PASS: process.env.SMTP_PASS,
    },
    DATABASE: {
        DB_URL: process.env.DB_URL,
        DB_NAME: process.env.DB_NAME,
    }
}

module.exports = AppConstants;