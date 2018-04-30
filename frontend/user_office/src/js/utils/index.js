const Utils = {
    path: function getPath(obj, ...props) {
        const value = obj[props[0]];
        if(props.length === 1 || !value) {
            return value
        }
        const rest = props.slice(1)

        return getPath.apply(null, [value, ...rest])
    },
    formatMoney: number => {
      let num = (number + '').split(''),
          result;

      switch (num.length) {
        case 1:
          result = '0';
          break;
        case 2:
          result = '0';
          break;
        case 3:
          result = num[0];
          break;
        case 4:
          result = num[0] + num[1];
          break;
        case 5:
          result = num[0] + num[1] + num[2];
          break;
        case 6:
          result = num[0] + 'K';
          break;
        case 7:
          result = num[0] + num[1] + 'K';
          break;
        case 8:
          result = num[0] + num[1] + num[2] + 'K';
          break;
        case 9:
          result = num[0] + 'M';
          break;
        case 10:
          result = num[0] + num[1] + 'M';
          break;
        case 11:
          result = num[0] + num[1] + num[2] + 'M';
          break;
        case 12:
          result = num[0] + 'B';
          break;
        case 13:
          result = num[0] + num[1] + 'B';
          break;
        case 13:
          result = num[0] + num[1] + num[2] + 'B';
          break;
      }

      return result;
    },
    splitDigits: num => {
        var str = num.toString().split('.');
        if (str[0].length >= 5) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
        }
        if (str[1] && str[1].length >= 5) {
            str[1] = str[1].replace(/(\d{3})/g, '$1 ');
        }
        return str.join('.');
    }
}

export default Utils