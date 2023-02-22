const { MongoClient } = require('mongodb');
const AppConstants = require('../../config/constants.js');

class MongoDBService {
    db;
    constructor() {
        this.connect();
    }

    connect = async () => {
        try {
            let client = await MongoClient.connect(AppConstants.DATABASE.DB_URL);
            this.db = client.db(AppConstants.DATABASE.DB_NAME);
            console.log('MongoDB connected');
        } catch (err) {
            throw ("DB Connection Error:", err);
        }
    }
}

module.exports = MongoDBService;