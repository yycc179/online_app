exports.getUpdatedAt = function(time) {
    var expire = new Date();
    var res = {};
    if (time > 0) {
        expire.setSeconds(0);
        expire.setMilliseconds(0);
        expire.setMinutes(expire.getMinutes() - time);
        res.$gt = expire;
    }
    else {
        res.$lt = expire;
    }

    return res;
}