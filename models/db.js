const mongoose = require('mongoose')
    , sha1 = require('utility').sha1
    , config = require('../config');

mongoose.Promise = require("bluebird");
// mongoose.createConnection(config.db_url);
mongoose.connect(config.db_url, {useMongoClient:true});

//mongoose.connection.once('open', () => console.log('mongo open'));
mongoose.connection.once('error', e => console.error(e));

module.exports = mongoose;