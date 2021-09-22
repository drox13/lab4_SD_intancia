const decodeHour = function belowDecodeHour(time_data) {
    let index = 0;
    let hour_text = '';
    while(time_data.charAt(index) != 'T') {
        index++;
    }                
    index += 1;
    while(time_data.charAt(index) != '.') {
        hour_text += time_data.charAt(index);
        index++;
    }
    return hour_text.split(":");
}

module.exports = {
    decodeHour
}