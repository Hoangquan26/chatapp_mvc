const mongoose = require('mongoose');

class Database {
    constructor() {
        this.db = null;
        this.uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/chatapp';
    }
    
    async connect() {
        mongoose.set('strictQuery', false);
        mongoose.set('debug', true);
        if (this.db) {
            console.log('Already connected to the database');
            return this.db;
        }
        try {
            this.db = await mongoose.connect(this.uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log('Database connection successful');
        } catch (error) {
            console.error('Database connection error:', error);
            throw error;
        }
    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }
}


module.exports = Database.getInstance().connect();