const router = require('express').Router()
    , passport = require('passport')
    , LocalStrategy = require('passport-local')
    , sha1 = require('utility').sha1
    , config = require('../../config')
    , Admin = require('../../models/admin');


passport.use(new LocalStrategy((username, password, done) => {
    Admin.findOne({ username, }, (err, user) => {
        if (err) return done(err);

        if (!user) {
            var message = 'Username invalid!';
        }
        else if (sha1(config.hash_slat + password) != user.password) {
            user = null;
            message = 'Password incorrect!'
        }

        done(null, user, { message });
    })
}));


router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.json({ ok: 0, error: info.message }); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.json({ ok: 1, user: user.username })
        });
    })(req, res, next);
});


router.get('/profile', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.json({user: req.user.username})
    }
    else {
        res.json({ user: '' })
    }
});

router.post('/logout', (req, res) => {
    req.logOut();
    res.json({ ok: 1 })
});

passport.serializeUser((user, done) => {
 done(null, user._id);
});

passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, user) => {
        done(null, user);
    })
});

module.exports = router
