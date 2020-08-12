const router = require('express').Router()
  , config = require('../../config')
  , fs = require('fs')
  , { hmac } = require('utility')
  , { exec } = require('child_process')
  , net = require('net');



function verify_signature(req, res, next) {
  var up_all = req.url.indexOf('web') > 0;
  req.up_param = up_all ? 'web' : ''

  const x_s = req.headers['x-hub-signature']
  const s = 'sha1=' + hmac('sha1', up_all ? process.env['HOOK_SECRET_WEB'] : process.env['HOOK_SECRET_YTS']
    , JSON.stringify(req.body), 'hex')

  if (s == x_s) {
    return next()
  }
  console.log('verify error')

  res.send('err')
}

function do_update(req, res, next) {
  exec(`update ${req.up_param} ${req.body.after}`,  (error, stdout) => {
    if (error) {
      console.log(error)
      res.send('err')
      return child.kill()
    }
    res.send('ok')
  })

}

router.post('/all', verify_signature, do_update);

router.post('/yts', verify_signature, do_update);

module.exports = router;
