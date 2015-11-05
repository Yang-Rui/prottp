require(['vue', 'Zepto'], function (Vue, $) {
	var Index = new Vue({
		el: '#j_index',
		data: {
			tel_placeholder: '请输入手机号码',
			icode_placeholder: '请输入验证码',
			icode_msg: '获取验证码',
			msg: '我已看过并同意餐桌网',
			prot: '用户服务协议',
			btn_msg: '验证码登录'
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

			}
		}
	})	
});
