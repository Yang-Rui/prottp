//做路由切换时需要改为define
require(['vue', 'Zepto','req', 'loading', 'Store', 'message', 'Util'], function (Vue, $, Req, Loading, Store, Msg, Util) {
    var Booking = new Vue({
        el: '#j_orderlist',
        data: {
            list: {}
        },
        created: function () {
            Loading.showLoading();
            Req.execute('orderList', {page: 1}, function(data){
                console.log(data);
                    Loading.hideLoading();
                    this.list = data.list;
                    console.log('OK');
                }, function(e){
                    Loading.hideLoading();
                    Msg.showMessage('抱歉，' + e.message);
                    console.log('FAIL');
                    return;
                }, this);
        },
        methods: {
            // getCoupon: function () {
            //     this.couponPrice = 0;
            // }
        },
        computed: {
            // paymentStatus: {
            //     get: function () {
            //         return Util.getOrderStatus(this.detail.status);
            //     }
            // },
            // payMethod: {
            //     get: function () {
            //         return Util.getPaymentMethod(this.detail.paymentMethod);
            //     }
            // },
            // payprice: {
            //     get: function () {
            //         return this.detail.amount - this.detail.couponSave || 0;
            //     }
            // }
        }
    });
});
