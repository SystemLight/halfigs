export default {
    on(selector, event, callback) {
        let el = document.querySelector(selector);
        el["_event" + event] = callback;
        el.addEventListener(event, callback);
    },
    off(selector, event) {
        let el = document.querySelector(selector);
        el.removeEventListener(event, el["_event" + event]);
        el["_event" + event] = undefined;
    }
};