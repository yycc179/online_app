const db = require('./db');

const Schema = db.Schema({
    date: { year: String, mon: String },
    name: String,
    country: { type: String, index: true },
    viewCount: Number,
})

Schema.index({ name: 1, date: 1, country: 1 })

Schema.index({ date: 1, country: 1 })
Schema.index({ "date.year": 1, country: 1 })

const Stats = db.model('app_stat', Schema);

module.exports = Stats;