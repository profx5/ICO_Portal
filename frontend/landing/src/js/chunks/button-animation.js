{
    let btn = $('.Btn'),
        duration = 300;


    btn.on('mouseover', function() {
        let $this = $(this);

        $this.addClass('Btn-hover');

        setTimeout(function() {
            if ($this.hasClass('Btn-hover')) {

                $this.addClass('Btn-animated');
            }
        }, duration);
    }).mouseout(function() {
        let $this = $(this);

        if ($this.hasClass('Btn-animated')) $this.removeClass('Btn-hover');
        $this.addClass('Btn-noEvent');

        setTimeout(function() {
            if($this.hasClass('Btn-animated')) {
                $this.removeClass('Btn-hover');
                setTimeout(function() {
                    $this.removeClass('Btn-animated Btn-hover Btn-noEvent');        
                }, duration);
                return;
            }
            $this.removeClass('Btn-animated Btn-hover Btn-noEvent');
        }, duration + 2);
    });
}