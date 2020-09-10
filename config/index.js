exports = module.exports = {
    version: 1,
    db_url: 'mongodb://127.0.0.1:27017/ott',
    session_secret: process.env['SESSION_SECRET'] || 'ss_secret',
    cookie_age: 24 * 3600 * 1000,  //24 hours
    sesion_ttl: 7 * 24 * 3600,   //7 days
    hash_slat: process.env['HASH_SALT_WEB'] || 'hash_salt',
    PATH: {
        cert: '/src/data/cert/cert.pem',
        priv: '/src/data/cert/privkey.pem',
        upload: '/src/data/upload',
        rsc_bin: '/src/data/upload/resource/',
        api_key: '/src/data/apikeys/',
    }
}
