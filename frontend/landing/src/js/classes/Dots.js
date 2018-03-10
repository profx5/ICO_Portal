class Dots {
    constructor(el, opts) {

        let $el = el,
            elList = {};

        for (let i = 0; i < $el.length; i++) {
            elList[`text${i}`] = $($el[i]).dotdotdot(opts).data( "dotdotdot" );
        }

        this.el = $el;
        this.elList = elList;
    }

    truncate() {

        for (let item in this.elList) {

            this.elList[item].truncate();
        }
    }

    restore() {

        for (let item in this.elList) {

            this.elList[item].restore();
        }   
    }

}