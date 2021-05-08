const geoip = require('geoip-lite')
    , request = require('request')


module.exports = {

    getUpdatedAt: function (time) {
        var expire = new Date();
        var res = {};
        if (time > 0) {
            expire.setSeconds(0);
            expire.setMilliseconds(0);
            expire.setMinutes(expire.getMinutes() - time);
            res.$gt = expire;
        }
        else {
            res.$lt = expire;
        }

        return res;
    },
    queryCity: function (ip) {
        const data = geoip.lookup(ip);

        if (data && data.country) {
            const { country, city, region, ll, timezone } = data
            return Promise.resolve({
                country, city,
                region, ll, timezone
            })

        }
        return new Promise((resolve, reject) => {
            request({ url: `http://ipinfo.io/${ip}/geo`, json: true }, (err, res, body) => {
                if (err) return resolve({ err: 'locate city failed, ip : ' + ip });

                if (body.loc) {
                    var pos = body.loc.split(',')
                    body.ll = [Number(pos[0]), Number(pos[1])]
                }
                const { country, city, region, ll, timezone } = body
                resolve({
                    country, city,
                    region, ll, timezone
                })
            })
        })
    },

    getClientIp: function (req, res, next) {
        req.ip = req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress ||
            req.headers['x-forwarded-for'];

        return next();
    },

    getCurrentMounth: function () {
        d = new Date();
        return {year: d.getFullYear(), mon: d.getMonth() + 1 }
    }

}