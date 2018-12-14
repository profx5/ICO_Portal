import moment from 'moment';


const humanizeUTCTime = (UTC, dateFormat) => {
    let newDate = moment(new Date(UTC));
    return moment(newDate).format(dateFormat);
}

export default humanizeUTCTime;
