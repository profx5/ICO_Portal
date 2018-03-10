
function makeFormula(tokensAmount = 1, bonusAmount = '0%') {

  let $el = $('.CalculatorSection_formula'),
      tokens = Number(tokensAmount),
      bonus = bonusAmount;


  let bonusAsNumber = (tokens * bonus) / 100;
  let result = tokens + bonusAsNumber;

  if (tokens % 1 !== 0) tokens = tokens.toFixed(2);
  if (result % 1 !== 0) result = result.toFixed(2);


  let formula = `${tokens} LTY tokens + ${bonus}% = ${result} LTY`;

  return $el.html(formula);
}



function updateProgressbar(data) {
  const USDRaised = data.USDcRaised + '',
        USDToGather = data.totalHardCapUSDc;

  const currentPhase = data.currentPhase;
        
  const stateName = currentPhase.name,
        discount = currentPhase.discountPercent,
        softCap = currentPhase.softCapUSDc + '',
        hardCap = currentPhase.hardCapUSDc + '';


  $('.ProgressSection_fundsText').html(`$ ${splitDigits(Number(USDRaised))}`);
  $('.ProgressSection_discountText').html(`${discount}%`);

  let raisedArray = USDRaised.split('')

  $('.ProgressSection_progressBarCurrent').attr('data-collected-money', `${raisedArray[0]}.${raisedArray[1]} M`).css('width', '30.86%');

  let softCapArray = softCap.split('');
  let hardCapArray = hardCap.split('');
  $('.ProgressSection_progressPoint-2').attr("data-state", `${stateName} Soft Cap`).attr("data-money", `$${softCapArray[0]} M`);
  $('.ProgressSection_progressPoint-3').attr("data-state", `${stateName} Hard Cap`).attr("data-money", `$${hardCapArray[0]} M`);

}

function setTimer(data) {

  let currentPhase = data.currentPhase;
  let UTCStartTime = new Date(currentPhase.startTime);
  let UTCEndTime = new Date(currentPhase.endTime);

  let time = {
    days: UTCEndTime.getUTCDay() - UTCStartTime.getUTCDay() <= 0 ? 0 : UTCEndTime.getUTCDay() - UTCStartTime.getUTCDay(),
    hours: UTCEndTime.getUTCHours() - UTCStartTime.getUTCHours() <= 0 ? 0 : UTCEndTime.getUTCHours() - UTCStartTime.getUTCHours(),
    minutes: UTCEndTime.getUTCMinutes() - UTCStartTime.getUTCMinutes() <= 0 ? 0 : UTCEndTime.getUTCMinutes() - UTCStartTime.getUTCMinutes(),
    seconds: UTCEndTime.getUTCSeconds() - UTCStartTime.getUTCSeconds() <= 0 ? 0 : UTCEndTime.getUTCSeconds() - UTCStartTime.getUTCSeconds(),
  };


  $('.ProgressSection_seconds, .RoadmapSection_seconds').html(time.seconds);
  $('.ProgressSection_minutes, .RoadmapSection_minutes').html(time.minutes);
  $('.ProgressSection_hours, .RoadmapSection_hours').html(time.hours);
  $('.ProgressSection_day, .RoadmapSection_day').html(time.days);



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

        $('.ProgressSection_hours, .RoadmapSection_hours').html(time.hours);
      }
   
      if (time.seconds === 0 && time.minutes === 0 && time.hours === 0 && time.days === 0) {
        clearInterval(interval);
      }
   

   $('.ProgressSection_seconds, .RoadmapSection_seconds').html(time.seconds < 10 ? `0${time.seconds}` : time.seconds);
   $('.ProgressSection_minutes, .RoadmapSection_minutes').html(time.minutes < 10 ? `0${time.minutes}` : time.minutes);
   $('.ProgressSection_hours, .RoadmapSection_hours').html(time.hours < 10 ? `0${time.hours}` : time.hours);
   $('.ProgressSection_day, .RoadmapSection_day').html(time.days < 10 ? `0${time.days}` : time.days);

  },1000);

}




(function() {

  axios.get('static/ico_info.json').then((response) => {

    let data = response.data;

    let rate = Number(data.USDcPerETHRate) / 100,
        bonus = Number(data.currentPhase.discountPercent);

    updateProgressbar(data);
    setTimer(data);
    
    let $rateInput = $('.CalculatorSection_input-rate');
    let $currencyInput = $('.CalculatorSection_input-currency');
    $rateInput.val(`$ ${rate}`);

    $currencyInput.inputmask({
        'alias': 'decimal',
        radixPoint: ',',
        showMaskOnHover: false,
        'suffix': ' ETH',
        "min": '1',
        'allowMinus': false,
        clearMaskOnLostFocus: false,
        oncomplete: function(key, result){



            let currencyNewVal = Math.floor(Number($currencyInput.inputmask('unmaskedvalue').replace(',', '.')) * 100) / 100;


            let tokens = currencyNewVal * rate;
            makeFormula(tokens, bonus);
        },
        oncleared: () => {
            // $currencyInput.val('1')
        }
    });

    let currencyCurrentVal = Number($currencyInput.inputmask('unmaskedvalue'));
    makeFormula(currencyCurrentVal, bonus);
  });

})();

