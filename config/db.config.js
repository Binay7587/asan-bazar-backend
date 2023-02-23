const mongoose = require('mongoose');
const AppConstants = require('../config/constants.js');

mongoose.set('strictQuery', false);
mongoose.connect(`${AppConstants.DATABASE.DB_URL}/${AppConstants.DATABASE.DB_NAME}`, (err) => {
    if (err) {
        console.log('Error in connecting to database.');
    } else {
        console.log('Database connected successfully.');
    }
});