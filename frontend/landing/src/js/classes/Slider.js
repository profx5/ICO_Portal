class Slider {
	constructor (className, opts) {
        let $el = $(className);

		this.inited = false;
		this.el = $el;

        this.inst = new Swiper($el,opts);

	}
}