//做路由切换时需要改为define
define(['vue', 'Zepto', 'req', 'message'], function (Vue, $, Req, Msg) {

    var Index = new Vue({
        el: '#j_index',
        data: {
            tel: '',
            icode: ''
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
                Req.execute('reqICodeLogin', {mobile: this.tel, verificationCode: this.icode}, function(data){
                    console.log(data);
                }, function(data){
                    //todo
                }, this);
            },
            //点击验证码
            onClickICode: function () {
                Req.execute('reqICode', {mobile: this.tel},
                    function(data){
                        console.log(data);
                }, function(data){
                    //todo
                }, this);
            }
        }
    });

});
