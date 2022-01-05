const db = require('./db');

const Schema = db.Schema({
    _id: { type: String, default: require('shortid').generate },
    ip: {type: String, index: true, unique: true},
    country: String,
    city: String,
    timezone: String,
    region: String,
    ll: [Number, Number],
})

module.exports = db.model('devinfo', Schema);