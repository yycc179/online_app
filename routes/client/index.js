const router = require('express').Router()
    , session = require('express-session')
    , passport = require('passport')
    , config = require('../../config');


router.use(require('cookie-parser')());
//router.use(session({ secret: config.session_secret, resave: true, 
//	saveUninitialized: true, cookie: { maxAge: config.cookie_age } }));

router.use(session({ secret: config.session_secret, resave: true}))
router.use(passport.initialize());
router.use(passport.session());

// router.use(require('serve-favicon')('public/favicon.ico'));

router.use('/', require('./auth'));
router.use('/site', require('./site'));
router.use('/vendor', require('./vendor'));

// if (process.env.NODE_ENV == 'production') {
//     router.use(function (req, res, next) {
//         if (req.isAuthenticated()) {
//             return next();
//         }
//         res.redirect('/web/signin')
//     });
// }

module.exports = router;









