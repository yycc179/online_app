const router = require('express').Router()
  , fs = require('fs')
  , multer = require('multer')
  , config = require('../../config')
  , path = require('path')
  , Vendor = require('../../models/vendor');

router.get('/', (req, res, next) => {
  const { vendor, addr, v } = req.query;
  Vendor.findOne({ name: vendor })
    .populate('sites', '-_id name valid')
    .lean()
    .exec((e, data) => {
      if (e) return next(e)
      if (!data) return res.json({ total: 0, e: "Vendor error" })
      const { sites } = data
      sites.forEach(el => {
        el.url = `/resource/${el.name}/${v}/${addr}.bin`
        el.main_logo = `/resource/${el.name}/main_logo.jpg`
        el.app_logo = `/resource/${el.name}/app_logo.jpg`
      });
      res.json({ total: data.sites.length, links: sites })
    })
});

router.get('/pic', (req, res) => {
  const { app } = req.query;
  fs.readdir(path.join(config.PATH.picture, app), (err, files) => {
    out = []
    if(files) {
      files.forEach(f => {
        out.push({name:f, url:`/picture/${app}/${f}`})
      })
    }
    res.json(out)
  });

})

router.use(function (err, req, res, next) {
  if (!err) {
    var err = new Error('invalid request');
    err.status = 404;
  }
  next(err);
})

if (process.env.NODE_ENV !== 'production') {
  router.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
      error: err.message,
      stack: err.stack
    });
  });
}

// production error handler
router.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err.message,
  })
});

module.exports = router;
