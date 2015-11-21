//做路由切换时需要改为define
require(['vue', 'Zepto','req', 'loading', 'Store', 'message'], function (Vue, $, Req, Loading, Store, Msg) {
    var Booking = new Vue({
        el: '#j_booking',
        data: {
            booking: {
                roomNumber: '',
                contact: '',
                mobile: '',
                orderDishes: []
            }
        },
        created: function () {
            this.addr = Store.get('addr');
            this.userInfo = Store.get('userInfo');
            this.booking = {
                date: Store.get('orderDate'),
                buildingId: this.addr.domainId,
                roomNumber: '',
                contact: this.userInfo.displayName || '',
                mobile: this.userInfo.mobile,
                orderDishes: this.getCart()
            };
            this.getCoupon();
        },
        methods: {
            getCart: function (isPlaceOrder) {
                var list = Store.get('list'),
                    cart = [];
                    if (list && list.length > 0) {
                        for (var i in list) {
                            if (list[i].bnum > 0) {
                                var item = {};
                                item.dishId = list[i].dishId;
                                !isPlaceOrder && (item.displayName = list[i].displayName);
                                !isPlaceOrder && (item.photo = list[i].photo);
                                !isPlaceOrder && (item.kitchenName = list[i].kitchenName);
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
                //重置dishes对象
                this.booking.orderDishes = this.getCart(true);
                console.log(this.booking);
                Req.execute('placeOrder', this.booking, function(data){
                    Loading.hideLoading();
                    console.log('OK');
                }, function(e){
                    Loading.hideLoading();
                    Msg.showMessage('抱歉，' + e.message);
                    console.log('FAIL');
                    return;
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
