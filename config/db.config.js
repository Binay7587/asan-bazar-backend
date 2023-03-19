const mongoose = require('mongoose');
const AppConstants = require('../config/constants.js');

mongoose.set('strictQuery', false);
mongoose.connect(AppConstants.DB_URI, (err) => {
    if (err) {
        console.log('Error in connecting to database.');
    } else {
        console.log('Database connected successfully.');
    }
});