const AppConstants = {
    APP_NAME: 'Learning MERN Stack',
    JWT_SECRET: '$ecReT',
    SMTP: {
        HOST: 'sandbox.smtp.mailtrap.io',
        PORT: 587,
        USER: '07d8b4ac6a818e',
        PASS: 'ed4081f636b1b4',
    },
    DATABASE: {
        DB_URL: 'mongodb://127.0.0.1:27017',
        DB_NAME: 'learning-mern',
    }
}

module.exports = AppConstants;