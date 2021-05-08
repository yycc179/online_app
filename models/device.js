const db = require('./db');

const Schema = db.Schema({
    _id: { type: String, default: require('shortid').generate },
    chipid: {type: String, index: true, unique: true},
    ip: {type: String, index: true},
    country: String,
    city: String,
    timezone: String,
    region: String,
    count: {type: Number, default:1},
    ll: [Number, Number],
    updatedAt: { type: Date, default: Date.now }
})

const Device = db.model('device', Schema);

module.exports = Device;