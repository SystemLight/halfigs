export default {
    id: function (idStr) {
        return document.getElementById(idStr);
    },
    q: function (selector) {
        return document.querySelector(selector);
    },
    qa: function (selector) {
        return document.querySelectorAll(selector);
    },
    style: function (dom, prop) {
        return dom.style[prop] || getComputedStyle(dom)[prop];
    },
    stylePx: function (dom, prop) {
        let val = this.style(dom, prop);
        if (isFinite(val)) {
            return Number(val);
        } else {
            if (val.endsWith("px")) {
                val = val.substr(0, val.length - "px".length);
            }
            return Number(val);
        }
    },
    getOuterWidth: function (dom) {
        return dom.offsetWidth + this.stylePx(dom, "marginLeft") + this.stylePx(dom, "marginRight");
    },
    getOuterHeight: function (dom) {
        return dom.offsetHeight + this.stylePx(dom, "marginTop") + this.stylePx(dom, "marginBottom");
    },
    width: function (dom, what) {
        return dom.clientWidth - this.stylePx(dom, "paddingLeft") - this.stylePx(dom, "paddingRight");
    },
    height: function (dom, what) {
        return dom.clientHeight - this.stylePx(dom, "paddingTop") - this.stylePx(dom, "paddingBottom");
    }
};