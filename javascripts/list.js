//做路由切换时需要改为define
require(['vue', 'Zepto', 'req'], function (Vue, $, Req) {

    var CONST_BUTTON_MSG = '去结算';
    var CONST_ANIMATE_TIMEOUT = 300;

    var SearchMenu = Vue.extend({
        template: '#j_sm_tpl',
        data: function (){
            return {
                msg_placeholder: '请输入地址'
            }
        },
        methods:{
            clickCancel: function () {
                var $self = $(this.$el);
                $self.removeClass('top-in').addClass('top-out');
                setTimeout(function(){
                    $self.addClass('hide').removeClass('top-out')
                }, CONST_ANIMATE_TIMEOUT);
            }
        }
    });
    //注入的自定义tag名必须全小写
    Vue.component('searchmenu', SearchMenu);

    var MarketBox = Vue.extend({
        template: '#j_m_tpl',
        data: function () {

        }
    });

    Vue.component('marketbox', MarketBox);

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
            //点击选择地址
            onClickAddr: function () {
                $(this.$el).find('.j_addr').removeClass('hide').addClass('top-in');
            },
            //选择某个tab
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
            },
            //点击提交按钮
            onSubmit: function (e) {
                //阻止时间冒泡
                e.preventDefault();
                e.stopPropagation();
                var self = this;
                //将请求到的数据列表放入数据对象中，渲染数据
                var url = Req.getReqURL('reqLocation');
                $.ajax({
                    type: 'GET',
                    url: url,
                    dataType: 'jsonp',
                    content: self,
                    data: {
                        searchStr: ''
                    },
                    jsonp: 'test',
                    jsonpCallback: 'json',
                    success: function (data) {
                        console.log(JSON.stringify(data));
                    },
                    error: function (data) {
                        console.log(JSON.stringify(data));
                    },
                    complete: function (data) {
                        console.log(JSON.stringify(data));
                    }
                })
            },
            test: function (data){
                console.log(JSON.stringify(data));
            },
            //点击底部bar
            clickbbar: function (e) {
                var $self = $(this.$el).find('.j_market');
                if($self.hasClass('hide')){
                    $self.removeClass('hide').addClass('down-in');
                    $(this.$el).find('#j_fbar').addClass('market-bg');
                }else{
                    $self.removeClass('down-in').addClass('down-out');
                    $(this.$el).find('#j_fbar').removeClass('market-bg');
                    setTimeout(function () {
                        $self.addClass('hide').removeClass('down-out');
                    }, CONST_ANIMATE_TIMEOUT);
                }
            }
        }
    });

    window.test = function(data){
        alert(1);
        console.log(JSON.stringify(data));
    }

    setTimeout(function () {
        List.$set('plist', [{left: 9, total: 99},{left: 10, total: 11}]);
    }, 3000);

})