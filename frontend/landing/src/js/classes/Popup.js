class Popup {
    constructor(template, timeout) {

        this.template = template;
        this.timeout = timeout;
        this.popupInst;

        this.popupInst = $.fancybox.open(this.template);
        if (this.timeout) setTimeout(() => {this.popupInst.close();}, this.timeout);
    }

}