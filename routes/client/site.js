const router = require('express').Router()
  , fs = require('fs')
  , multer = require('multer')
  , Vendor = require('../../models/vendor')
  , WebSite = require('../../models/website');

router.get('/', (req, res, next) => {
  WebSite.find()
    .lean()
    .exec((e, data) => {
      if (e) return next(e)
      data.forEach(i => {
        i.main_logo = `/resource/${i.name}/main_logo.jpg`
        i.app_logo = `/resource/${i.name}/app_logo.jpg`
      })
      res.json(data)
    })
});

router.post('/edit', (req, res, next) => {
  var site = req.body

  if (!site._id) {
    new WebSite(site).save((e, data) => {
      res.json(data)
    })
  }
  else {
    if (site.origin_name) {
      fs.renameSync(`./public/resource/${site.origin_name}/`, `./public/resource/${site.name}/`)
    }
    WebSite.findOneAndUpdate({ _id: site._id }, { name: site.name, valid: site.valid }, { new: true })
      .exec((e, data) => {
        if (e) return next(e)
        res.json(data)
      })
  }
});

router.post('/del', (req, res, next) => {
  const { _id } = req.query
  console.log(_id)
  WebSite.deleteOne({ _id })
    .exec((e, d) => {
      if (e) return next(e)
      res.json(d)
    })
  Vendor.updateMany({sites: _id}, {$pull: {sites: _id}}).exec()
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var path = `./public/resource/${req.body.name}/`

    if (file.fieldname === "bin") {
      path += parseFloat(req.body.ver).toFixed(1)
    }
    console.log(path)
    if (!fs.existsSync(path)) {
      require("mkdirp").sync(path)
    }
    cb(null, path)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage }).fields([{ name: 'logo', maxCount: 2 }, { name: 'bin', maxCount: 10 }])

router.post('/upload', function (req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      return res.json({ error: err.code })
    }
    res.json({ error: null })
  });
})

module.exports = router;
