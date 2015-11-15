//做路由切换时需要改为define
require(['vue', 'Zepto','req', 'Store'], function (Vue, $, Req, Store) {
    var Index = new Vue({
        el: '#j_booking',
        data: {
        },
        methods: {
            placeorder: function () {
                Req.execute('wxPayNotify', null, function(data){
                    var $this = $(this.$el);
                    if(data.length > 0){
                        //双向绑定数据
                        this.llist = data;
                        $this.find('#j_llist').removeClass('hide');
                        this.nolocation_msg = '';
                        $this.find('#j_warns').addClass('hide');
                    }else{
                        this.llist = [];
                        $this.find('#j_llist').addClass('hide');
                        this.nolocation_msg = CONST_NO_LOCATION_MSG;
                        $this.find('#j_warns').removeClass('hide');
                    }
                }, function(data){
                    //todo
                }, this);
            }
        }
    })
});
