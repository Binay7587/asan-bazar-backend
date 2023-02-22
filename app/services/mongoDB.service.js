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

    addSingleRow = async (collectionName, data) => {
        try {
            return await this.db.collection(collectionName).insertOne(data);
        } catch (err) {
            throw ("DB Insert Error:", err);
        }
    }

    addMultipleRows = async (collectionName, data) => {
        try {
            return await this.db.collection(collectionName).insertMany(data);
        } catch (err) {
            throw ("DB Insert Error:", err);
        }
    }

    getSingleRow = async (collectionName, query) => {
        try {
            return await this.db.collection(collectionName).findOne(query);
        } catch (err) {
            throw ("DB Get Error:", err);
        }
    }

    getMultipleRows = async (collectionName, query) => {
        try {
            return await this.db.collection(collectionName).find(query).toArray();
        } catch (err) {
            throw ("DB Get Error:", err);
        }
    }

    updateSingleRow = async (collectionName, query, data) => {
        try {
            return await this.db.collection(collectionName).updateOne(query, { $set: data });
        } catch (err) {
            throw ("DB Update Error:", err);
        }
    }

    updateMultipleRows = async (collectionName, query, data) => {
        try {
            return await this.db.collection(collectionName).updateMany(query, { $set: data });
        } catch (err) {
            throw ("DB Update Error:", err);
        }
    }

    deleteSingleRow = async (collectionName, query) => {
        try {
            return await this.db.collection(collectionName).deleteOne(query);
        } catch (err) {
            throw ("DB Delete Error:", err);
        }
    }

    deleteMultipleRows = async (collectionName, query) => {
        try {
            return await this.db.collection(collectionName).deleteMany(query);
        } catch (err) {
            throw ("DB Delete Error:", err);
        }
    }
}

module.exports = MongoDBService;