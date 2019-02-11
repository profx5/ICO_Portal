import React from 'react';
import moment from 'moment';


class Countdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            days: '00',
            hours: '00',
            minutes: '00',
            seconds: '00'
        };
        this.countdown = null;
    }

    componentDidMount() {
        this.startCountdown();
    }

    componentWillUnmount() {
        clearInterval(this.countdown);
    }
    
    calcDiff = (start, end) => {
        let startTime = + new Date(start);
        let endTime = + new Date(end);

        return (endTime - startTime);
    }

    formatTime = (miliseconds) => {
        let ms = miliseconds;
        let timeArr = moment(new Date(ms)).utcOffset(0).toArray();

        timeArr.shift();
        timeArr.pop();
        
        let time = {
            days:  (timeArr[0] * 30) + timeArr[1],
            hours: timeArr[2],
            minutes: timeArr[3],
            seconds: timeArr[4],
        };
        
        while (time.seconds > 60) {
            time.seconds -= 60;
            time.minutes += 60;
        }
    
        while (time.minutes > 60) {
            time.minutes -= 60;
            time.hours += 24;
        }
    
        while (time.hours > 24) {
            time.hours -= 24;
            time.days += 1;
        }

        return time;
    }

    getTime = () => {
        let {startTime, endTime} = this.props;
        let ms = this.calcDiff(startTime, endTime);

        return this.formatTime(ms);
    }

    startCountdown = () => {
        var time = this.getTime();

        this.countdown = setInterval(() => {

            time.seconds -= 1;
            if (time.seconds < 0) {
                time.minutes -= 1;
                time.seconds = 59;
            }
        
            if (time.minutes <= 0) {
                time.minutes = 59;
                if (time.hours !== 0)  time.hours -= 1;
            }
        
            if (time.hours <= 0 && time.days !== 0) {
                time.hours = 23;
                if (time.days !== 0)  time.days -= 1;
            }
        
            if (time.seconds <= 0 && time.minutes <= 0 && time.hours <= 0 && time.days <= 0) {
                clearInterval(this.countdown);
                console.error('Countdown has been reached it\'s end!');
                this.setState(() => {
                    return {
                        seconds: '00',
                        minutes: '00',
                        hours: '00',
                        days: '00'
                    };
                });
            }

            this.setState(() => {
                return {
                    seconds: time.seconds < 10 ? `0${time.seconds}` : `${time.seconds}`,
                    minutes: time.minutes < 10 ? `0${time.minutes}` : `${time.minutes}`,
                    hours: time.hours < 10 ? `0${time.hours}` : `${time.hours}`,
                    days: time.days < 10 ? `0${time.days}` : `${time.days}`
                }
            })
        }, 1000)
    }

    render() {
        const {days, hours, minutes, seconds} = this.state;
        return this.props.children(days, hours, minutes, seconds);
    }
}

export default Countdown;
