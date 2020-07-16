export const getTime = () => {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let minutesString = minutes;
    if (minutes < 10) {
        minutesString = "0" + minutes;
    }
    let timeString = hours + "." + minutesString;
    return timeString;
};

export const getDate = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let dayString = day;
    let monthString = month;
    if (day < 10) {
        dayString = "0" + day;
    }
    if (month < 10) {
        monthString = "0" + month;
    }
    let dateString = dayString + "." + monthString + "." + year;
    return dateString;
};