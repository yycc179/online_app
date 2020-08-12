/**
 * Created by yangyang on 2016/2/18.
 * Update by yangyang 2017/1/3
 */
const db = require('./db')
    , sha1 = require('utility').sha1
    , config = require("../config");

const UserShcema = db.Schema({
    _id: {type: String, default: require('shortid').generate},
    username: { type: String, index: true, unique: true },
    password: String,
    email: String,
})

const Admin = db.model('admin', UserShcema);

module.exports = Admin