import moment from 'moment';

const Utils = {
    path: function getPath(obj, ...props) {
        const value = obj[props[0]];
        if(props.length === 1 || !value) {
            return value
        }
        const rest = props.slice(1)

        return getPath.apply(null, [value, ...rest])
    },
    throttle: (func, ms) => {

      var isThrottled = false,
        savedArgs,
        savedThis;

      function wrapper() {

        if (isThrottled) {
          savedArgs = arguments;
          savedThis = this;

          return;
        }

        func.apply(this, arguments);

        isThrottled = true;

        setTimeout(function() {
          isThrottled = false;
          if (savedArgs) {
            wrapper.apply(savedThis, savedArgs);
            savedArgs = savedThis = null;
          }
        }, ms);
      }

      return wrapper;
    },
    formatMoney: number => {
      let num = (number + '').split(''),
          result;

      switch (num.length) {
        case 1: result = '0';
          break;
        case 2: result = '0';
          break;
        case 3: result = num[0];
          break;
        case 4: result = num[0] + num[1];
          break;
        case 5: result = num[0] + num[1] + num[2];
          break;
        case 6: result = num[0] + 'K';
          break;
        case 7: result = num[0] + num[1] + 'K';
          break;
        case 8: result = num[0] + num[1] + num[2] + 'K';
          break;
        case 9: result = num[0] + 'M';
          break;
        case 10: result = num[0] + num[1] + 'M';
          break;
        case 11: result = num[0] + num[1] + num[2] + 'M';
          break;
        case 12: result = num[0] + 'B';
          break;
        case 13: result = num[0] + num[1] + 'B';
          break;
        case 14: result = num[0] + num[1] + num[2] + 'B';
          break;
        case 15: result = `${num[0]}T`;
          break;
        case 16: result = `${num[0]}.${num[1]}T`;
          break;
        case 17: result = `${num[0]}.${num[1]}${num[2]}T`;
          break;
        case 18: result = `${num[0]}.${num[1]}${num[2]}${num[3]}T`;
          break;
      }

      return result;
    },
    splitDigits: num => {
        var str = num.toString().split('.');
        if (str[0].length >= 4) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
        }
        if (str[1] && str[1].length >= 4) {
            str[1] = str[1].replace(/(\d{3})/g, '$1 ');
        }
        return str.join('.');
    },
    formatInputNumber: (event, callback) => {
        let val = event.target.value,
            lastChar = val[val.length - 1],
            newVal;

        if (!val) {
            callback('');
            return;
        } 

        if (lastChar.match(/[0-9.,]/g) === null) {

            let newVal = val.substr(0,val.length - 1);
            callback(newVal);
        } else callback(val);

        if (val.indexOf(',') != -1) {
            newVal = val.replace(',' , '.');
            callback(newVal);

            if (newVal.match(/\./g) !== null && newVal.match(/\./g).length >= 2) {
              callback(newVal.substr(0,newVal.length - 1));
            }
        }

        if (val.match(/\./g) !== null && val.match(/\./g).length >= 2) {
            callback(val.substr(0,val.length - 1));
        }

        if (val.length === 1 && val.match(/[.,]/g) != null) callback('');
    },
    humanizeUTCTime: (UTC, dateFormat) => {
        let newDate = moment(new Date(UTC));
        return moment(newDate).format(dateFormat);
    },
    setTimer: (startUTCTime, endUTCTime, callback) => {
      let newTime;
      let startTime = moment(new Date(startUTCTime)).toArray(); 
      let endTime = moment(new Date(endUTCTime)).toArray();


      let timeDifference = endTime.map((el, index) => {
        return el - startTime[index];
      });

      timeDifference.shift();
      timeDifference.pop();


      let time = {
        days: (timeDifference[0] * 30) + timeDifference[1],
        hours: timeDifference[2],
        minutes: timeDifference[3],
        seconds: timeDifference[4],
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

      var interval = setInterval(function() {

          time.seconds -= 1;
          if (time.seconds <= 0) {
            time.minutes -= 1;
            time.seconds = 59;
          }
        
          if (time.minutes <= 0) {
            if (time.hours !== 0)  time.hours -= 1;
            time.minutes = 59;
          }
       
          if (time.hours <= 0 && time.days !== 0) {
            if (time.days !== 0)  time.days -= 1;
            time.hours = 23;

          }
       
          if (time.seconds <= 0 && time.minutes <= 0 && time.hours <= 0 && time.days <= 0) {
            clearInterval(interval);
          } else if (time.days <= 0) {
            clearInterval(interval);

            console.error('Timer has been reached it\'s end!');
            newTime = {
              seconds: '00',
              minutes: '00',
              hours: '00',
              days: '00'
            };
            callback(`${newTime.days} days ${newTime.hours}h ${newTime.minutes}m ${newTime.seconds}s`);
            return;
          }
       
      newTime = {
        seconds: time.seconds < 10 ? `0${time.seconds}` : time.seconds + '',
        minutes: time.minutes < 10 ? `0${time.minutes}` : time.minutes + '',
        hours: time.hours < 10 ? `0${time.hours}` : time.hours + '',
        days: time.days < 10 ? `0${time.days}` : time.days + ''
      };
      callback(`${newTime.days} days ${newTime.hours}h ${newTime.minutes}m ${newTime.seconds}s`);

      },1000);

    }
};

export default Utils;