define(['vue', 'Zepto', 'req', 'message', 'loading', 'Store'], function (Vue, $, Req, Msg, Loading, Store) {
    var PWD = new Vue({
        el: '#j_pwd',
        data: {
            mobile: '',
            vode: '',
            pwd: ''
        },
        created: function () {
            var userInfo = Store.get('userInfo');
            if(!userInfo){
                location.href = 'list.html';
            }
            this.mobile = userInfo.mobile;
        },
        methods: {
            //获得验证码
            getVCode: function () {
                Loading.showLoading();
                Req.execute('reqICode', {mobile: this.mobile},
                    function(data){
                        Loading.hideLoading();
                        Msg.showMessage('验证码发送成功!');
                }, function(data){
                    Loading.hideLoading();
                    Msg.showMessage('网络开小差了,请重试');
                }, this);
            },
            confirm: function () {
                if(!this.pwd){
                    Msg.showMessage('请输入新密码');
                    return;
                }
                if(!this.vcode){
                    Msg.showMessage('请输入验证码');
                    return;
                }
                Loading.showLoading();
                Req.execute('reqChangePWD', {password: this.pwd,verificationCode: this.vcode}, function(data){
                    Loading.hideLoading();
                    Msg.showMessage('密码修改成功!');
                    setTimeout(function(){
                        history.back(-1);
                    }, 2000);
                }, function(){
                    Loading.hideLoading();
                    Msg.showMessage('请求失败，请稍后再试');
                }, this);
            }
        }
    });
});