define([], function () {
    var store = {
        set: function (key, value) {
            if (typeof value == 'object' || typeof value == 'string' || typeof value == 'number') {
                typeof value == 'object' && (value = JSON.stringify(value));
                localStorage.setItem(key, value);
            } else {
                console.warn('不受支持的类型');
            }
        },
        get: function (key) {
            var value = localStorage.getItem(key);
            try {
                if (/\{\"\w+\"\:/.test(value)) {
                    value = JSON.parse(value);
                }
            } catch (e) {
                console.error(e.message);
            }
            return value;
        },
        remove: function (key) {
            localStorage.removeItem(key);
        }
    };
    return store;
});