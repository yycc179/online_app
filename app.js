const express = require('express')
    , compression = require('compression')
    , bodyParser = require('body-parser');

const app = express();

app.set('x-powered-by', false)
// view engine setup
// app.set('views', 'views');
// app.set('view engine', 'ejs');

app.use(require('morgan')(':method :url :status :res[content-length] - :response-time ms :date[iso]'));


app.use('/yts', require('./routes/server/yts.js'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/githook', require('./routes/server/hook.js'))

console.log(process.env['SRV_TYPE'])

if(process.env['SRV_TYPE'] == 'all') {

    app.use('/api', require('./routes/server'));
    app.use('/adm', require('./routes/client'));

    app.use(compression({filter: function(req, res){
        return /\w\.bin$/i.test(req.url)
    }}))
    app.use(express.static('public'))
    app.use(express.static( require('./config').PATH.upload))

}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500).json({
            message: err.message,
            error: err
        });
    });
}

// production error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
