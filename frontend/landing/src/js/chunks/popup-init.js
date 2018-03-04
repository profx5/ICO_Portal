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
    smallBtn: `<button data-fancybox-close class="MapPopup_btnClose"></button>`,
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
})