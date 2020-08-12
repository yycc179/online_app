const router = require('express').Router()
  , Vendor = require('../../models/vendor');

router.get('/', (req, res, next) => {
  Vendor.find()
    .lean()
    .exec((e, data) => {
      if (e) return next(e)
      res.json(data)
    })

});

router.post('/edit', (req, res, next) => {
  var vendor = req.body
  if (!vendor._id) {
    new Vendor(vendor).save((e, data) => {
      if(e) return next(e)
      res.json(data)
    })
  }
  else {
    Vendor.findOneAndUpdate({ _id: vendor._id }, vendor, { new: true })
      .exec((e, data) => {
        if (e) return next(e)
        console.log(2, data)
        res.json(data)
      })
  }
});

router.post('/del', (req, res, next) => {
  const { _id } = req.query
  console.log(_id)
  Vendor.remove({ _id })
    .exec((e, d) => {
      if (e) return next(e)
      res.json(d)
    })
});

module.exports = router;
