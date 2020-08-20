const router = require('express').Router()
  , config = require('../../config')
  , fs = require('fs')
  , net = require('net');

router.get('/', (req, res, next) => {
  const { s, js, h } = req.query

  var a = 'ver'

  if (s && js) {
    if (sha1(s + js + process.env['HASH_SALT_YTS']) != h) {
      return res.status(403).send('verify err!\n')
    }
    a = s + ' ' + js
  }

  const client = net.createConnection({ port: 3001, timeout: 15000 }, () => {
    client.write(a)
  })

  client.on('data', data => {
    res.send(data.toString());
    client.end();
  }).on('timeout', () => {
    res.send('Connect service timeout!\n');
    client.end();
  }).on('error', e => {
    res.send('Connect service error!\n');
    client.end();
  })

});

router.get('/keylist', (req, res) => {
  fs.readdir(config.PATH.api_key, (err, files) => {
    if (files && files.length) {
      id = Math.floor(Math.random() * files.length);
      res.setHeader('Content-Type', 'text/plain')
      res.sendFile(`${config.PATH.api_key}${id}.key`)
    }
    else {
      res.send('keylist err!');
    }
  });

})

module.exports = router;

