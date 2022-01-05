const router = require('express').Router()
    , Stats = require('../../models/stats')
    , Utils = require('./utils')
    , Devinfo = require('../../models/devinfo')


router.get('/:name/*/*.bin', Utils.getClientIp, (req, res, next) => {
    const { name } = req.params
    const { ip } = req;

    var date = Utils.getCurrentMounth()
    Devinfo.findOne({ ip }).exec((e, d) => {
        const country  = d ? d.country : 'Unknow'
       Stats.updateOne({ date, name, country}, { $inc: { viewCount: 1 } }, { upsert: true }).exec()
    })
    next();
})


module.exports = router;