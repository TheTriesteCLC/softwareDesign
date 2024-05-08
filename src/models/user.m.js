const { model, Schema } = require('mongoose'); 

const DOCUMENT_NAME = 'User'
const COLLECTION_NAME = 'Users'

const userSchema = new Schema({
    phone: {
        type: String,
        unique: true,
        require: true
    },

    password: {
        type: String,
        require: true,
    },

    roles: {
        type: String,
        enum: ["user", "admin", "driver", "staff"],
        default: 'user'
    },

    fullname: {
        type: String,
    },

    avatar: { 
        type: String, 
    }, 

    email: {
        type: String,
    },

    address: {
        type: Array,
        default: [],
    },

    birth_date: {
        type: String,
    }
}, {
    collection: COLLECTION_NAME,
    timestamps: true
  }
);

module.exports = {
    userModel: model(DOCUMENT_NAME, userSchema)
}

