//做路由切换时需要改为define
require(['vue', 'Zepto', 'req'], function (Vue, $, Req) {

    var CONST_BUTTON_MSG = '去结算';
    var CONST_ANIMATE_TIMEOUT = 300;
    var CONST_NO_LOCATION_MSG = '没有搜索到地址';

    var SearchMenu = Vue.extend({
        template: '#j_sm_tpl',
        data: function (){
            return {
                msg_placeholder: '请输入地址',
                nolocation_msg: '',
                llist:[],
            }
        },
        props: ['input_val'],
        timer: '',
        events:{
            'searchMenuInit': function(msg){
                this.input_val = msg;
                this.requestAddr(msg);
            }
        },
        damp: false,
        methods:{
            clickAddr: function(e){
                var $target = $(e.currentTarget),
                    id = $target.data('id'),
                    obj;
                for(var i = 0, len = this.llist && this.llist.length; i < len; i++){
                    if(id == this.llist[i].id){
                        obj = this.llist[i];
                        break;
                    }
                }

                this.$dispatch('chooseALocation', obj);
                this.hideMenu();
            },
            inputAddr: function(e){
                var self = this,
                    $target = $(this.$el).find('#j_input');

                //如果不为空则搜索
                // if(!$target.val()){
                //     return;
                // }

                //将请求到的数据列表放入数据对象中，渲染数据
                if(this.damp){
                    clearTimeout(this.timer);
                    this.timer = setTimeout(function(){
                        self.requestAddr($target.val());
                        self.damp = false;
                    }, 500);
                }else{
                    this.requestAddr($target.val());
                    this.damp = true;
                }
                var url = Req.getReqURL('reqLocation');
            },
            //请求地标信息
            requestAddr: function(val){
                Req.execute('reqLocation', {searchStr: val}, function(data){
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
            },
            clickCancel: function () {
                this.hideMenu();
            },
            hideMenu: function () {
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
        events:{
            'chooseALocation': function(lObj){
                //更改title的值
                this.msg_pos = lObj.name;
                this.requestPList(lObj.id);
            }
        },
        methods:{
            //点击选择地址
            onClickAddr: function () {
                $(this.$el).find('.j_addr').removeClass('hide').addClass('top-in');
                this.$broadcast('searchMenuInit', this.msg_pos);
                //触发子类的事件
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
            },
            requestPList: function (id, notNow){
                var d, dateString;
                if(!notNow){
                    d = new Date();
                    dateString = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                }else{
                    d = new Date();
                    d.setDate(d.getDate() + 1);
                    dateString = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                }

                Req.execute('reqMenu', {buildingId: id, date: dateString}, function(data){
                    if(data.length > 0){
                        this.plist = data;
                    }
                }, function(data){
                    //todo
                }, this);
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
            },
            showMsg: function(e){
                var $target = $(e.target).parents('.j_dish'),
                    $desc = $target.find('.j_desc');
                if($desc.hasClass('hide')){
                    $desc.removeClass('hide').css('height', '100%');
                }else{
                    $desc.addClass('hide').css('height', 0);
                }
            }
        }
    });

    // setTimeout(function () {
    //     List.$set('plist', [{left: 9, total: 99},{left: 10, total: 11}]);
    // }, 3000);

})