let is = {
    isObject: function (obj) {
        return Object.prototype.toString.call(obj) === "[object Object]";
    }
};

let withData = {
    groupByArray: function (data, keys, process) {
        let groupArray = [];
        let groupIndex = {};
        data.forEach(v => {
            if (process) {
                v = process(v);
            }
            let key = "";
            keys.forEach(k => {
                key += v[k];
            });
            if (groupIndex.hasOwnProperty(key)) {
                groupArray[groupIndex[key]].push(v);
            } else {
                groupArray.push([v]);
                groupIndex[key] = groupArray.length - 1;
            }
        });
        return groupArray;
    },
    groupBy: function (data, key, process) {
        let groupObj = {};
        data.forEach(v => {
            if (process) {
                v = process(v);
            }
            if (groupObj.hasOwnProperty(v[key])) {
                groupObj[v[key]].push(v);
            } else {
                groupObj[v[key]] = [v];
            }
        });
        return groupObj;
    },
    flat: function (data) {
        let originArray = [];
        Object.keys(data).forEach(key => {
            originArray.push(...data[key])
        });
        return originArray;
    }
};

let fastChar = {
    cutEnd: function (str, cutStr) {
        if (str.endsWith(cutStr)) {
            return str.substr(0, str.length - cutStr.length);
        }
        return str;
    },
    cutStart: function (str, cutStr) {
        if (str.startsWith(cutStr)) {
            return str.substr(0 + cutStr.length, str.length);
        }
        return str;
    },
    lStrip: function (str, removeStr) {
        while (removeStr.includes(str[0])) {
            str = str.substr(1, str.length);
        }
        return str;
    },
    rStrip: function (str, removeStr) {
        while (removeStr.includes(str[str.length - 1])) {
            str = str.substr(0, str.length - 1);
        }
        return str;
    },
    strip: function (str, removeStr) {
        return this.rStrip(this.lStrip(str, removeStr), removeStr);
    }
};

let performance = {
    debounce: function (fn, wait) {
        let timer = 0;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(this, args);
            }, wait);
        }
    },
    throttle: function (fn, wait) {
        let timer = null;
        return function (...args) {
            if (timer) {
                return;
            }
            timer = setTimeout(function () {
                fn.apply(this, args);
                timer = null;
            }, wait);
        }
    }
};

let copy = {
    clone: function (obj) {
        if (Array.isArray(obj)) {
            return [...obj];
        } else {
            return {...obj};
        }
    },
    deepClone: function (obj) {
        let newObj = Array.isArray(obj) ? [] : {};
        for (let i in obj) {
            if (obj.hasOwnProperty(i)) {
                if (Array.isArray(obj[i]) || is.isObject(obj[i])) {
                    newObj[i] = this.deepClone(obj[i]);
                } else {
                    newObj[i] = obj[i];
                }
            }
        }
        return newObj;
    }
};

module.exports = {
    is, withData, fastChar, performance, copy
};
