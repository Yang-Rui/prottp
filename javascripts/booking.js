//做路由切换时需要改为define
require(['vue', 'Zepto','req', 'Store'], function (Vue, $, Req, Store) {
    var Booking = new Vue({
        el: '#j_booking',
        data: {
        },
        created: function () {
            this.addr = Store.get('addr');
            this.userInfo = Store.get('userInfo');
            this.booking = {
                date: '2015-11-18',
                buildingId: this.addr.domainId,
                roomNumber: '',
                contact: this.userInfo.displayName,
                mobile: this.userInfo.mobile,
                orderDishes: this.getCart()
            }
            this.getCoupon();
        },
        methods: {
            getCart: function () {
                var list = Store.get('list'),
                    cart = [];
                    if (list && list.length > 0) {
                        for (var i in list) {
                            if (list[i].bnum > 0) {
                                var item = {};
                                item.dishId = list[i].dishId;
                                item.displayName = list[i].displayName;
                                item.photo = list[i].photo;
                                item.kitchenName = list[i].kitchenName;
                                item.price = list[i].price;
                                item.number = list[i].bnum;
                                cart.push(item);
                            }
                        }
                    }
                    return this.cart = cart;
            },
            placeorder: function () {
                Loading.showLoading();
                Req.execute('placeOrder', this.booking, function(data){
                    Loading.hideLoading();
                    console.log('OK');
                }, function(data){
                    console.log('FAIL');
                }, this);
            },
            getCoupon: function () {
                this.couponPrice = 0;
            }
        },
        computed: {
            totalprice: {
                get: function () {
                    var tprice = 0;
                    for (var i in this.cart) {
                        tprice += this.cart[i].price * this.cart[i].number;
                    }
                    return tprice;
                }
            },
            payprice: {
                get: function () {
                    return this.totalprice - this.couponPrice;
                }
            }
        }
    });
    Booking.$watch('totalprice', function (val) {
      this.fullName = this.firstName + ' ' + val
    });
});
