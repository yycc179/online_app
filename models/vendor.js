const db = require('./db');

const Schema = db.Schema({
    _id: { type: String, default: require('shortid').generate },
    name: {type: String, unique: true},
    sites: [{ type: String, ref: 'website' }],
})

const Vendor = db.model('vendor', Schema);

module.exports = Vendor;