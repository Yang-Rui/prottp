define(['vue', 'Zepto', 'req', 'message', 'loading', 'Store'], function (Vue, $, Req, Msg, Loading, Store) {
    var MC = new Vue({
        el: '#j_account',
        data: {
            userimg: '',
            username: '',
            mobile: '',
            email: '',
            balance: 0
        },
        created: function () {
            var userInfo = Store.get('userInfo');
            if(!userInfo){
                location.href = 'index.html';
            }
            this.userimg = userInfo.photo;
            this.username = userInfo.displayName;
            this.email = userInfo.email;
            this.mobile = userInfo.mobile;
        },
        methods: {
            changePassword: function () {
                location.href = 'pwdchange.html';
            },
            quit: function () {
                Store.set('userInfo', '');
                history.back(-1);
            }
        }
    });
});