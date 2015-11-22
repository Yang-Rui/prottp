define([], function () {
    var Util = {
        getQueryParam: function (key) {
            var param = {},
                search = window.location.search;
                search = search && search.replace('?', '').split('&') || [];
            for (var i=0, length = search.length; i < length; i++) {
                var q = search[i].split('=');
                param[q[0]] = q[1];
            }
            return key ? (param[key] || '') : param;
        },
        getOrderStatus: function (status) {
            var st = {
                '0': '取消',
                '1': '完成',
                '10': '支付中',
                '11': '已支付',
                '15': '已配送'
            };
            return st[status] || '';
        },
        getPaymentMethod: function (method) {
            var mth = {
                '2': '微信支付',
                '3': '支付宝'
            };
            return mth[method] || '';
        }
    };
    return Util;
});