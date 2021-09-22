const Time = require('../data/Time');
let time = new Time(0, 0, 0);

const initTime = (hr, mn, sc) => {
    time.setTime(hr, mn, sc);
    console.log("hour bby: " + time.getHour() + ":" + time.getMinute() + ":" + time.getSecond());
}

module.exports = {
    updateTime: initTime
}