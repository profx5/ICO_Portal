
function makeFormula(tokensAmount = 1, discountAmount = '0%', rateAmount) {

  let $el = $('.CalculatorSection_formula'),
      tokens = Number(tokensAmount),
      discount = discountAmount,
      ethRate = rateAmount,
      discountedEthRate = ((100 - discount) / 100) * 0.01,
      result = parseInt(tokens * ethRate / discountedEthRate);

  let price = result * discountedEthRate,
      priceStr = '';



  if (tokens <= 0) {
    priceStr = `<span class="CalculatorSection_price-resultNoDiscount">$0</span>`;
    console.log(tokens);
  } else if (discount !== 0) {
    priceStr += `<strike>$${Math.round(result * 0.01)}</strike> <span class="CalculatorSection_price-result">$${Math.round(result * discountedEthRate)}</span> with ${discount}% discount!`;
  } else if (discount === 0) {
    priceStr = `<span class="CalculatorSection_price-resultNoDiscount">${Math.round(result * 0.01)}</span>`;
  }



  let formula = `${parseInt(tokens, 10)} ETH * $${ethRate} / $${discountedEthRate} = ${result}`;

  return {
    formula: formula,
    price: priceStr
  };
}


function updateProgressbar(data) {
  const USDRaised = data.USDcRaised + '',
        USDToGather = data.totalHardCapUSDc;

  const currentPhase = data.currentPhase;
  currentPhase.startTime = new Date().getTime()
        
  const stateName = currentPhase.name,
        discount = currentPhase.discountPercent;



  // $('.ProgressSection_fundsText').html(`$ ${splitDigits(parseInt((Number(USDRaised / 100))))}`);
  $('.CalculatorSection_text-discount').html(`${discount}%`);


  let progressbarWidth = ((USDRaised * 100) / Number(USDToGather)).toFixed(2);

  $('.ProgressSection_progressBarCurrent').attr('data-collected-money', `$${formatMoney(USDRaised, 1)}`).css('width', `${progressbarWidth}%`);


}

function setTimer(data) { 
  let currentPhase = data.currentPhase;

  let startTime = moment(new Date(currentPhase.startTime)).toArray(); // Thursday, 8 March 2018 г., 00:00:00
  let endTime = moment(new Date(currentPhase.endTime * 1000)).toArray(); // Sunday, 8 April 2018 г., 00:00:00


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
         $('.ProgressSection_seconds, .RoadmapSection_seconds').html('00');
         $('.ProgressSection_minutes, .RoadmapSection_minutes').html('00');
         $('.ProgressSection_hours, .RoadmapSection_hours').html('00');
         $('.ProgressSection_day, .RoadmapSection_day').html('00');
         return;
      }
   

   $('.ProgressSection_seconds, .RoadmapSection_seconds').html(time.seconds < 10 ? `0${time.seconds}` : time.seconds);
   $('.ProgressSection_minutes, .RoadmapSection_minutes').html(time.minutes < 10 ? `0${time.minutes}` : time.minutes);
   $('.ProgressSection_hours, .RoadmapSection_hours').html(time.hours < 10 ? `0${time.hours}` : time.hours);
   $('.ProgressSection_day, .RoadmapSection_day').html(time.days < 10 ? `0${time.days}` : time.days);

  },1000);

}




(function() {

  axios.get('ico_info.json').then((response) => {

    let data = response.data;

    let rate = Number(data.USDcPerETHRate) / 100,
        discount = Number(data.currentPhase.discountPercent),
        crowdSaleAddress = data.crowdSaleAddress;

    updateProgressbar(data);
    setTimer(data);
    
    let $rateInput = $('.CalculatorSection_input-rate');
    let $currencyInput = $('.CalculatorSection_input-currency');
    $rateInput.val(`$ ${rate}`);

    $currencyInput.val('1');


    $('.CalculatorSection_fieldInner-address').html(crowdSaleAddress + '');

    $currencyInput.on('input', function(event) {
      let val = $(this).val() || ' ',
          lastChar = val[val.length - 1],
          newVal;


      if (lastChar.match(/[0-9.,]/g) === null) {
        event.preventDefault();
        $(this).val(val.substr(0,val.length - 1));
      }

      if ($(this).val().indexOf(',') != -1) {
        newVal = val.replace(',' , '.');
        $(this).val(newVal);

        if (newVal.match(/\./g) !== null && newVal.match(/\./g).length >= 2) {
          $(this).val(newVal.substr(0,newVal.length - 1));
        }

      }

      if (val.match(/\./g) !== null && val.match(/\./g).length >= 2) {
        $(this).val(val.substr(0,val.length - 1));
      }
      
      let currencyNewVal = Math.floor(Number($currencyInput.val()) * 100) / 100; 

      let tokens = currencyNewVal;
      $('.CalculatorSection_formula').html(makeFormula(tokens, discount, rate).formula);
      $('.CalculatorSection_price').html(makeFormula(tokens, discount, rate).price);


      if (val.match(/\d+/g)[0] < 1000) {
        $('.CalculatorSection_form').addClass('CalculatorSection_form-invalid');
      } else {
        $('.CalculatorSection_form').removeClass('CalculatorSection_form-invalid');
      }

    });

    let currencyCurrentVal = Number($currencyInput.val());

    $('.CalculatorSection_formula').html(makeFormula(currencyCurrentVal, discount, rate).formula);
    $('.CalculatorSection_price').html(makeFormula(currencyCurrentVal, discount, rate).price);

  });

})();

