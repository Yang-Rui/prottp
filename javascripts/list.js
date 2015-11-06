//做路由切换时需要改为define
require(['vue', 'Zepto'], function (Vue, $) {
	var List = new Vue({
		el: '#j_list',
		data: {
			msg_pos: '光大会展中心',
			msg_tab_left: '今日预定',
			msg_tab_right: '明日预定',
			price: '12',
			num: '12',
			msg_btn: '去结算',
			plist: []
		},
		methods:{
			chooseTab: function (e) {
				var $target = $(e.currentTarget),
					$bar = $(this.$el).find('#j_bar');

				//处理字体变色
				if(!$target.hasClass('current')){
					$target.addClass('current').siblings().removeClass('current');
				}
				//处理边框
				if($target.data('type')){
					$bar.addClass('tab-move');
				}else{
					$bar.removeClass('tab-move');
				}
			}
		}
	});

	var ListItem = Vue.extend({
		template: '',
		data: {}
	});
})