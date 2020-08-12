const Admin = require('../models/admin');
const config = require('../config');
const { sha1 } = require('utility')

const u = process.argv[2]
const pass = process.argv[3]

if (!u || !pass) {
    return console.log('err')
}


Admin.deleteMany({}, (e, r) => {
    new Admin({
        username: u,
        password: sha1(config.hash_slat + pass)
    }).save(async e => {
        if (e) {
            console.log(e)
        }
        else {
            console.log('ok')
        }
        process.exit()
    });
})

