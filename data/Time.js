class Time
{
    constructor (hour, minute, second) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    setTime(hour, minute, second) {
        this.hour = hour;
        this.minute = minute;
        this.second = second;
    }

    getHour() {
        return this.hour;
    }

    getMinute() {
        return this.minute;
    }

    getSecond() {
        return this.second;
    }
}

module.exports = Time;