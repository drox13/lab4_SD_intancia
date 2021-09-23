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

    start() {
        setInterval(()=>{
            this.second += 1;
            if(this.second > 60) {
                this.second = 0;
                this.minute += 1;
                if(this.minute > 60) {
                    this.minute = 0;
                    this.hour += 1;
                    if(this.hour > 23) {
                        this.hour = 0;
                    }
                }
            }
        },1000);
    }
}

module.exports = Time;