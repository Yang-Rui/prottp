define(['vue', 'Zepto', 'req', 'message', 'loading', 'Store'], function (Vue, $, Req, Msg, Loading, Store) {
    var PWD = new Vue({
        el: '#j_pwd',
        data: {
            mobile: '',
        },
        created: function () {
            var userInfo = Store.get('userInfo');
            if(!userInfo){
                location.href = 'index.html';
            }
            this.mobile = userInfo.mobile;
        },
        methods: {
            //获得验证码
            getVCode: function () {
                //todo
            },
            confirm: function () {
                //todo
            }
        }
    });
});