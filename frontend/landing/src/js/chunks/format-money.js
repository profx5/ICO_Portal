function formatMoney(number, decimal = 0) {
  let num = (number + '').split(''),
      result;

  if (decimal !== 0) {

  switch (num.length) {
    case 1:
      result = `0,${num[0]}`;
      break;
    case 2:
      result = `0,${num[0]}${num[1]}`;
      break;
    case 3:
      result = `${num[0]}`;
      break;
    case 4:
      result = `${num[0]}${num[1]}`;
      break;
    case 5:
      result = `${num[0]}${num[1]}${num[2]}`;
      break;
    case 6:
      result = `${num[0]}.${num[1]}${decimal === 2 ? num[2] : ''} K`;
      break;
    case 7:
      result = `${num[0]}${num[1]}.${num[2]}${decimal === 2 ? num[3] : ''} K`;
      break;
    case 8:
      result = `${num[0]}${num[1]}${num[2]}.${num[3]}${decimal === 2 ? num[4] : ''} K`;
      break;
    case 9:
      result = `${num[0]}.${num[1]}${decimal === 2 ? num[2] : ''} M`;
      break;
    case 10:
      result = `${num[0]}${num[1]}.${num[2]}${decimal === 2 ? num[3] : ''} M`;
      break;
    case 11:
      result = `${num[0]}${num[1]}${num[2]}.${num[3]}${decimal === 2 ? num[4] : ''} M`;
      break;
    case 12:
      result = `${num[0]}.${num[1]}${decimal === 2 ? num[2] : ''} B`;
      break;
    case 13:
      result = `${num[0]}${num[1]}.${num[2]}${decimal === 2 ? num[3] : ''} B`;
      break;
    case 13:
      result = `${num[0]}${num[1]}${num[2]}.${num[3]}${decimal === 2 ? num[4] : ''} B`;
      break;
  }

    return result;
  }
  switch (num.length) {
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
      result = num[0] + ' K';
      break;
    case 7:
      result = num[0] + num[1] + ' K';
      break;
    case 8:
      result = num[0] + num[1] + num[2] + ' K';
      break;
    case 9:
      result = num[0] + ' M';
      break;
    case 10:
      result = num[0] + num[1] + ' M';
      break;
    case 11:
      result = num[0] + num[1] + num[2] + ' M';
      break;
    case 12:
      result = num[0] + ' B';
      break;
    case 13:
      result = num[0] + num[1] + ' B';
      break;
    case 13:
      result = num[0] + num[1] + num[2] + ' B';
      break;
  }

  return result;

}