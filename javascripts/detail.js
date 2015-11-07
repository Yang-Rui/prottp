//做路由切换时需要改为define
require(['vue', 'Zepto'], function (Vue, $) {
	var Detail = new Vue({
		el: '#j_detail',
		data: {
			kitchen: {
				displayName: '抓一小处',
				origin: '四川成都',
				sales: '4',
				rating: 4,
				specialities: 'TEST TEST',
				description: 'ABST sadgye eufihaf aoihaiuf aiuhafa fa.afiasfhui fs. ffas fhuh fu ahf yug ayfu gafl mdjkcai'
			}
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
