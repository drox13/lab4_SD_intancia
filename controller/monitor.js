const Time = require('../data/Time');
let time = new Time(0, 0, 0);

const updateTime = (hr, mn, sc) => {
    time.setTime(hr, mn, sc);
    time.start();
}

const readTime = function belowReadTime() {
    return { hour: time.getHour(), minute: time.getMinute(), second: time.getSecond()}
}

module.exports = {
    updateTime,
    readTime
}