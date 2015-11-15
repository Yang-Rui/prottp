//做路由切换时需要改为define
define(['vue', 'Zepto', 'req', 'message', 'loading'], function (Vue, $, Req, Msg, Loading) {

    var Index = new Vue({
        el: '#j_index',
        data: {
            tel: '18521058006',
            icode: '682583'
        },
        methods: {
            //选择复选框
            chooseProt: function(e){
                var $target = $(e.currentTarget);
                if($target.hasClass('current')){
                    $target.removeClass('current');
                }else{
                    $target.addClass('current');
                }
            },
            //点击协议
            clickProt: function () {

            },
            //点击提交
            onSubmit: function () {
                if(!this.tel){
                    Msg.showMessage('请输入手机号');
                    return;
                }
                if(!/^1[345678][\d]{9}$/g.test(this.tel)){
                    Msg.showMessage('请输入正确的手机号');
                    return;
                }
                if(!this.icode){
                    Msg.showMessage('请输入验证码');
                    return;
                }
                Loading.showLoading();
                Req.execute('reqICodeLogin', JSON.stringify({mobile: this.tel, verificationCode: this.icode}), function(data){
                    Loading.hideLoading();
                    if(data.message){
                        Msg.showMessage(data.message);
                        return;
                    }
                    this.requestUesrInfo(data.token);
                }, function(data){
                    Loading.hideLoading();
                    if(data.message){
                        Msg.showMessage(data.message);
                    }else{
                        Msg.showMessage('网络开小差了,请重试');
                    }
                }, this);
            },
            //请求用户信息
            requestUesrInfo: function(token){
                Loading.showLoading();
                Req.execute('reqMyInfo', '', function(data){
                    Loading.hideLoading();
                    console.log(data);
                }, function (){
                    Loading.hideLoading();
                    Msg.showMessage('网络开小差了,请重试');
                }, this, 'Authorization:Bearer ' + token);
            },
            //点击验证码
            onClickICode: function () {
                Loading.showLoading();
                Req.execute('reqICode', {mobile: this.tel},
                    function(data){
                        Loading.hideLoading();
                        Msg.showMessage('验证码发送成功!');
                        console.log(data);
                }, function(data){
                    Loading.hideLoading();
                    //todo
                }, this);
            }
        }
    });

});
