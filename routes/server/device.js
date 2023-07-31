const router = require('express').Router()
    , moment = require('moment-timezone')
    , utils = require('./utils')
    , Device = require('../../models/device')
    , Devinfo = require('../../models/devinfo')

router.get('/', utils.getClientIp, (req, res) => {
    const { chipid = 'unknown', ip = req.ip } = req.query;

    Device.findOne({ chipid })
        .exec((e, device) => {
            if (e) {
                res.json({ err: "error to find: " + chipid });
            }
            else if (!device) {
                utils.queryCity(ip).then(data => {
                    data.chipid = chipid;
                    data.ip = ip;
                    new Device(data).save();
                    delete data.chipid
                    data.time = moment().tz(data.timezone).format()
                    res.json(data);
                })

            }
            else {
                const { country, city, region, ll, timezone, ip } = device
                res.json({
                    country, city, region, ll, timezone, ip,
                    time: moment().tz(timezone).format()
                });
            }

        })

})

router.get('/info', utils.getClientIp, (req, res) => {
    const { ip = req.ip } = req.query;
    res.setHeader('Access-Control-Allow-Origin', '*')

    Devinfo.findOne({ ip })
        .exec((e, dev) => {
            if (e) {
                res.json({ err: "error to find: " + ip });
            }
            else if (!dev) {
                utils.queryCity(ip).then(data => {
                    data.ip = ip;
                    new Devinfo(data).save();
                    data.time = moment().tz(data.timezone).format()
                    res.json(data);
                })

            }
            else {
                const { country, city, region, ll, timezone, ip } = dev
                res.json({
                    country, city, region, ll, timezone, ip,
                    time: moment().tz(timezone).format()
                });
            }

        })

})

module.exports = router;
