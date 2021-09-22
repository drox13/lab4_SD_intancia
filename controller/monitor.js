const Time = require('../data/Time');
let time = new Time(0, 0, 0);

const updateTime = (hr, mn, sc) => {
    time.setTime(hr, mn, sc);
}

module.exports = {
    updateTime
}