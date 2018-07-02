{

  // $('.CalculatorSection_fieldIcon').click(function(e) {
  //   let available = true;
  //   if (!available) return;
  //   new ClipboardJS(".copyBtn");
  //   available = false;
  //   e.preventDefault();

  //   let popupInst = new Popup(`
  //     <div class="CopyPopup">
  //         <div class="CopyPopup_icon animated bounceIn">

  //           <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41">
  //             <g fill="none" fill-rule="evenodd">
  //               <circle cx="20.5" cy="20.5" r="20.5" fill="#4FDDBE"/>
  //               <path fill="#FDFFFE" fill-rule="nonzero" d="M16.5933 24.8904l-4.3161-4.2037-2.3732 2.3114 5.6957 5.5472.0065-.0064 1.0399 1.0128 16.0801-15.6613-2.4193-2.3563z"/>
  //             </g>
  //           </svg>

  //         </div>
  //         <div class="CopyPopup_content">
  //             <p class="CopyPopup_text">Address successfully copied</p>
  //         </div>
  //     </div>
  //   `, 2000)

  // });

  $('.TeamSection_moreInfo').click(function(e) {
    e.preventDefault();
    let self = $(this);
    let github;


    if (self.closest('.TeamSection_teammate').find('.TeamSection_linkWrapper-github').attr('href') ) {
      github = `<a target="blank" href="${self.closest('.TeamSection_teammate').find('.TeamSection_linkWrapper-github').attr('href')}" style="background-image: url('static/img/common/svg/github-white.svg')" class="TeammatePopup_linkWrapper"></a>`
    } else {
      github = '';
    }

    $.fancybox.open(
      `<div class="TeammatePopup">
          <div class="TeammatePopup_socialLinks">
            ${github}
            <a target="blank" href="${self.closest('.TeamSection_teammate').find('.TeamSection_linkWrapper-linkedin').attr('href')}" style="background-image: url('static/img/common/svg/linkedin-white.svg')" class="TeammatePopup_linkWrapper"></a>
          </div>
          <p class="TeammatePopup_header">${self.siblings('.TeamSection_name').html()}</p>
          <span class="TeammatePopup_title">${self.siblings('.TeamSection_title').html()}</span>
          <p class="TeammatePopup_text">${self.closest('.TeamSection_info').data('desc')}</p>
      </div>`, {
      baseTpl: '<div class="fancybox-container" role="dialog" tabindex="-1">' +
            '<div class="fancybox-bg" style="background-color: rgba(50,116,255,.8);"></div>' +
            '<div class="fancybox-inner">' +
                '<div class="fancybox-infobar">' +
                    '<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>' +
                '</div>' +
                '<div class="fancybox-toolbar">{{buttons}}</div>' +
                '<div class="fancybox-navigation">{{arrows}}</div>' +
                '<div class="fancybox-stage"></div>' +
                '<div class="fancybox-caption-wrap"><div class="fancybox-caption"></div></div>' +
            '</div>' +
        '</div>'
    })
  });


}
