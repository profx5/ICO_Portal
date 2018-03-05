for(let i = 0; i < 2050; i++) {
    let size = _.random(3,6);
    let x = _.random(6, 1000);
    let y = _.random(6, 1000);
    let opacity = _.random(0.05,0.3);

    $('.MainSection_dotWrapper').append(`<span class="MainSection_dot" style="left: ${x}px; top: ${y}px; width: ${size}px; height: ${size}px; opacity: ${opacity}"></span>`)
}