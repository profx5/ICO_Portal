
{

  let map = new GMaps({
    div: '.MapSection_map',
    lat: 49.282617,
    lng: -123.092594,
    zoom: 14,
    styles: mapStyles
  })

  map.addMarker(mainMarkerOpts)

    
  $(`[data-fancybox="fancybox"]`).fancybox({

    idleTime: 0,
    btnTpl : {
      smallBtn: `
      <button data-fancybox-close class="MapPopup_btnClose">

        <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512.001">
          <path fill="#EDEDED" d="M284.284 256L506.142 34.142c7.81-7.81 7.81-20.474 0-28.284-7.81-7.81-20.474-7.81-28.284 0L256 227.716 34.142 5.858c-7.81-7.81-20.474-7.81-28.284 0-7.81 7.81-7.81 20.474 0 28.284L227.716 256 5.858 477.858c-7.81 7.81-7.81 20.474 0 28.284 7.81 7.81 20.473 7.81 28.284 0L256 284.284l221.858 221.858c7.81 7.81 20.473 7.81 28.284 0 7.81-7.81 7.81-20.474 0-28.284L284.284 256z"/>
        </svg>

      </button>`,
    },
    touch: false,
    afterLoad: function() {

      var popupMap = new GMaps({
        div: '.MapPopup_map',
        lat: 49.282617,
        lng: -123.092594,
        zoom: 14,
        styles: mapStyles,
      });

      popupMap.addMarker(mainMarkerOpts);
    },
  });

}


{

  $('.CalculatorSection_fieldIcon').click(function(e) {
    let available = true;
    if (!available) return;
    new ClipboardJS(".copyBtn");
    available = false;
    e.preventDefault();
    
    let popupInst = $.fancybox.open(`
      <div class="CopyPopup">
          <div class="CopyPopup_icon animated bounceIn">

            <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41">
              <g fill="none" fill-rule="evenodd">
                <circle cx="20.5" cy="20.5" r="20.5" fill="#4FDDBE"/>
                <path fill="#FDFFFE" fill-rule="nonzero" d="M16.5933 24.8904l-4.3161-4.2037-2.3732 2.3114 5.6957 5.5472.0065-.0064 1.0399 1.0128 16.0801-15.6613-2.4193-2.3563z"/>
              </g>
            </svg>

          </div>
          <div class="CopyPopup_content">
              <p class="CopyPopup_text">Address successfully copied</p>
          </div>
      </div>
    `);

    setTimeout(() => {
        popupInst.close();
    }, 2000)

  });

  $('.CalculatorSection_tip').click(function(e) {
    let available = true;
    if (!available) return;
    available = false;
    e.preventDefault();
    
    let popupInst = $.fancybox.open(`
      <div class="InvestPopup">
          <div class="InvestPopup_content">
              <p class="InvestPopup_text">Info about how to invest in Longevity</p>
          </div>
      </div>
    `);

    setTimeout(() => {
        popupInst.close();
    }, 2000)
  });


}