const router = require('express').Router()
  , fs = require('fs')
  , path = require("path")
  , multer = require('multer')
  , config = require('../../config')

router.get('/folders', (req, res) => {
  fs.readdir(config.PATH.picture, (err, files) => {
      res.json(files || [])
  });

});

router.post('/del', (req, res) => {
  const { app } = req.query
  const _path = path.join(config.PATH.picture, app)
  req.body.forEach(f => {
    var picPath = path.join(_path, f.name);
    fs.unlinkSync(picPath);
  });

  res.json({ ok: 1 })

});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const _path = path.join(config.PATH.picture, req.query.app)

    if (!fs.existsSync(_path)) {
      require("mkdirp").sync(_path)
    }
    cb(null, _path)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage })

router.post('/upload', upload.array('picture', 50), function (req, res) {
  res.json({ ok: 1 })
})

module.exports = router;
