const router = require('express').Router()
  , { hmac } = require('utility')
  , { exec } = require('child_process');


  function verify_signature(req, res, next) {
    const { p } = req.query;
    const salt = (p == 'web' ? process.env['HOOK_SECRET_WEB'] : process.env['HOOK_SECRET_YTS']) || 'none'

    req.up_param = p;

    const x_s = req.headers['x-hub-signature']
    const s = 'sha1=' + hmac('sha1', salt, JSON.stringify(req.body), 'hex')

    if (s == x_s) {
        return next()
    }
    res.json({ err: 1, p, x_s, salt })
}


function do_update(req, res, next) {
  exec(`update ${req.up_param} ${req.body.after}`, (error, stdout) => {
    if (error) {
      res.send(error)
      return child.kill()
    }

    res.send(stdout)
  })

}

router.post('/', verify_signature, do_update);

module.exports = router;