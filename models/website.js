const db = require('./db');

const Schema = db.Schema({
    _id: { type: String, default: require('shortid').generate },
    name: { type: String, index: true, unique: true},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    valid: { type: Boolean, default: true },
})

const Site = db.model('website', Schema);

module.exports = Site