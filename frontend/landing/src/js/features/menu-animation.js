

{

    $('.Header_menuWrapper, .HeaderSticky_menuWrapper').click(function() {
        $('.Sidebar').addClass('Sidebar-active');
        $('html').toggleClass('noscroll');
    });

    $('.Sidebar_menuWrapper').click(function() {
        $('.Sidebar').removeClass('Sidebar-active');
        $('html').toggleClass('noscroll');
    });

}


{

    function showStickyHeader() {
        if ($(window).scrollTop() > $('.MainSection').offset().top + $('.MainSection').height()) {
            $('.HeaderSticky').addClass('HeaderSticky-active');
        } else {
            $('.HeaderSticky').removeClass('HeaderSticky-active');
        }
    }

    $(window).scroll(throttle(showStickyHeader, 40));

}