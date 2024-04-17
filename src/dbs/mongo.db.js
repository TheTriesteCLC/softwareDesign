const mongoose = require('mongoose')

class Database {
    constructor() {
        this.#connect();
    }

    #connect(type = 'mongodb') {
        if (1 === 1) {
            mongoose.set("debug", true)
            mongoose.set("debug", {
                color: true
            })
        }

        mongoose.connect(process.env.MONGO, {
                maxPoolSize: 50
            }, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => console.log('Connected!'))
            .catch(error => console.error('Connection error:', error));
    }

    static getInstance() {
        if (!Database._instance) {
            Database._instance = new Database();
        }
        return Database._instance;
    }
}

const instanceMongoDb = Database.getInstance()

module.exports = instanceMongoDb