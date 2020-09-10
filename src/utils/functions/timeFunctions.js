export const getTimeString = () => {
    let time = new Date();
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let minutesString = minutes;
    if (minutes < 10) {
        minutesString = "0" + minutes;
    }
    return hours + "." + minutesString;
};

export const getDateString = () => {
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
    return dayString + "." + monthString + "." + year;
};