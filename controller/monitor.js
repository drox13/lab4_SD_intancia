const Time = require('../data/Time');
let time = new Time(0, 0, 0);

const initTime = (hr, mn, sc) => {
    time.setTime(hr, mn, sc);
    time.start();
}

const updateTime = (hr,mn,sc) => {
    time.setTime(hr, mn, sc);
}

const readTime = function belowReadTime() {
    return { hour: time.getHour(), minute: time.getMinute(), second: time.getSecond()}
}

module.exports = {
    initTime,
    updateTime,
    readTime
}