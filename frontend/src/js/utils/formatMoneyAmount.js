const formatMoneyAmount = number => {
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
  }

  export default formatMoneyAmount;
