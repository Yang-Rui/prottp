//做路由切换时需要改为define
require(['vue', 'Zepto', 'req', 'loading', 'message', 'Store'], function (Vue, $, Req, Loading, Msg, Store) {

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
                //当默认文字和传入的文字不相同时，才发送msg请求
                if(this.msg_placeholder != msg){
                    this.input_val = msg;
                    this.requestAddr(msg);
                }else{
                    this.requestAddr('');
                }
            }
        },
        damp: false,
        created: function () {
            // Store.remove('list');
        },
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
                this.$dispatch('showBottomBar');
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
                // this.$dispatch('showBottomBar');
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
            return {
                plist: [],
                totalBnum: 0,
                totalPrice: 0
            };
        },
        events:{
            'initMarket': function(data, totalBnum, totalPrice){
                this.plist = data;
                //在子组件里有父对象完整的价格和数量映射
                this.totalBnum = totalBnum;
                this.totalPrice = totalPrice;
            }
        },
        methods:{
            //点击增加
            clickAdd: function(e){
                var $target = $(e.target).parents('.j_pitem'),
                    did = $target.data('did');
                for(var i = 0, len = this.plist && this.plist.length; i < len; i++){
                    if(this.plist[i].dishId == did){
                        this.plist[i].bnum++;
                        this.totalBnum++;
                        this.totalPrice += this.plist[i].price;
                        this.$dispatch('updateBnumAndPrice', this.totalBnum, this.totalPrice);
                        break;
                    }
                }
            },
            //点击减少
            clickReduce: function(e){
                var $target = $(e.target).parents('.j_pitem'),
                    did = $target.data('did');
                for(var i = 0, len = this.plist && this.plist.length; i < len; i++){
                    if(this.plist[i].dishId == did){
                        this.plist[i].bnum--;
                        this.totalBnum--;
                        this.totalPrice -= this.plist[i].price;
                        this.$dispatch('updateBnumAndPrice', this.totalBnum, this.totalPrice);
                        break;
                    }
                }
            }
        }
    });

    Vue.component('marketbox', MarketBox);

    var LeftMenu = Vue.extend({
        template: '#j_l_tpl',
        data: function(){
            return {
                userimg: '',
                username: ''
            }
        },
        methods: {
            hide: function(){
                var $dom = $(this.$el),
                    $cont = $dom.find('#j_lcont');

                $cont.addClass('left-out').removeClass('left-in');
                setTimeout(function(){
                    $cont.removeClass('left-out');
                    $dom.addClass('hide');
                }, CONST_ANIMATE_TIMEOUT);
            }
        }
    });

    Vue.component('leftmenu', LeftMenu);

    var List = new Vue({
        el: '#j_list',
        data: {
            msg_pos: '请输入地址',
            msg_btn: '去结算',
            plist: [],
            //总预定数
            totalBnum: 0,
            //总价格
            totalPrice: 0
        },
        events:{
            //显示底部的预订栏
            'showBottomBar': function(){
                $(this.$el).find('#j_fbar').removeClass('hide');
            },
            //选择了一个地标
            'chooseALocation': function(lObj){
                //更改title的值
                this.msg_pos = lObj.name;
                this.locationId = lObj.id;
                Store.set('addr', lObj);
                this.requestPList();
            },
            //更新价格和预订数
            'updateBnumAndPrice': function(bnum, price){
                this.totalBnum = bnum;
                this.totalPrice = price;
            }
        },
        methods:{
            //点击选择地址
            onClickAddr: function () {
                $(this.$el).find('.j_addr').removeClass('hide').addClass('top-in');
                this.$broadcast('searchMenuInit', this.msg_pos);
                //触发子类的事件
                $(this.$el).find('#j_fbar').addClass('hide');
            },
            //选择某个tab
            chooseTab: function (e) {
                var $target = $(e.currentTarget),
                    $bar = $(this.$el).find('#j_bar');

                //处理字体变色
                if(!$target.hasClass('current')){
                    $target.addClass('current').siblings().removeClass('current');
                }else{
                    //重复点击直接返回
                    return;
                }

                //切换时重置金额
                this.resetBnumAndPrice();

                //处理边框
                if($target.data('type')){
                    $bar.addClass('tab-move');
                    this.requestPList(true);
                }else{
                    $bar.removeClass('tab-move');
                    this.requestPList(false);
                }

            },
            //重置
            resetBnumAndPrice: function () {
                if(this.plist){
                    for(var i = 0, len = this.plist.length; i < len; i++){
                        this.plist[i].bnum = 0;
                    }
                }
                this.totalBnum = 0;
                this.totalPrice = 0;
            },
            //点击提交按钮
            onSubmit: function (e) {
                //阻止事件冒泡
                e.preventDefault();
                e.stopPropagation();

                if(this.totalPrice == 0 || this.totalBnum == 0){
                    Msg.showMessage('请先选择菜品');
                    return;
                }
                Store.set('list', this.plist);
                //先使用这种多页应用的写法
                location.href = 'detail.html';
            },
            requestPList: function (notNow){
                var d, dateString;
                if(!this.locationId){
                    return;
                }

                if(!notNow){
                    d = new Date();
                    dateString = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                }else{
                    d = new Date();
                    d.setDate(d.getDate() + 1);
                    dateString = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                }

                Store.set('orderDate', dateString);

                Loading.showLoading();
                Req.execute('reqMenu', {buildingId: this.locationId, date: dateString}, function(data){
                    Loading.hideLoading();
                    if(data.length > 0){
                        //在测试环境重定向图片地址
                        if(Req.getEnvironment() == 'dev'){
                            for(var i = 0, len = data.length; i < len; i++){
                                data[i].photo = 'http://localhost:8088' + data[i].photo;
                                data[i].userPhoto = 'http://localhost:8088' + data[i].userPhoto;
                            }
                        }
                        for(var i = 0 , len = data.length; i < len; i ++){
                            //初始化选购数量
                            data[i].bnum = 0;
                        }
                        this.plist = data;
                        $(this.$el).find('#j_ilist').removeClass('hide');
                        this.$emit('showBottomBar');
                    }else{
                        Msg.showMessage('没有搜索到任何菜品');
                        this.plist = [];
                    }
                }, function(data){
                    //todo
                }, this);
            },
            //点击底部bar
            clickbbar: function (e) {
                var $self = $(this.$el).find('.j_market'),
                    $cont = $self.find('.j_cont');

                if($self.hasClass('hide')){
                    $self.removeClass('hide');
                    $cont.addClass('down-in');
                    $(this.$el).find('#j_fbar').addClass('market-bg');
                    this.$broadcast('initMarket', this.plist, this.totalBnum, this.totalPrice);
                }else{
                    $cont.removeClass('down-in').addClass('down-out');
                    $(this.$el).find('#j_fbar').removeClass('market-bg');
                    setTimeout(function () {
                        $cont.removeClass('down-out');
                        $self.addClass('hide');
                    }, CONST_ANIMATE_TIMEOUT);
                }
            },
            hideBottomBar: function () {
                $(this.$el).find('#j_fbar').addClass('hide');
            },
            //点击左侧的按钮
            clickLMenuBtn: function () {
                var $dom = $(this.$el).find('#j_lmenu'),
                    $cont = $dom.find('#j_lcont');

                $dom.removeClass('hide');
                $cont.addClass('left-in');
                this.hideBottomBar();
            },
            //显示菜的介绍
            showMsg: function(e){
                var $target = $(e.target).parents('.j_dish'),
                    $desc = $target.find('.j_desc'),
                    self = this;

                if($desc.hasClass('hide')){
                    $desc.removeClass('hide down-out').addClass('down-in');
                    $target.find('#j_sbar').hide();
                }else{
                    $desc.removeClass('down-in').addClass('down-out');
                    setTimeout(function(){
                        $desc.addClass('hide');
                        $target.find('#j_sbar').show();
                    }, CONST_ANIMATE_TIMEOUT);
                }
            },
            //点击增加
            clickAdd: function(e){
                var $target = $(e.target).parents('.j_pitem'),
                    did = $target.data('did');
                for(var i = 0, len = this.plist && this.plist.length; i < len; i++){
                    if(this.plist[i].dishId == did){
                        this.plist[i].bnum++;
                        this.totalBnum++;
                        this.totalPrice += this.plist[i].price;
                        break;
                    }
                }
            },
            //点击减少
            clickReduce: function(e){
                var $target = $(e.target).parents('.j_pitem'),
                    did = $target.data('did');
                for(var i = 0, len = this.plist && this.plist.length; i < len; i++){
                    if(this.plist[i].dishId == did){
                        this.plist[i].bnum--;
                        this.totalBnum--;
                        this.totalPrice -= this.plist[i].price;
                        break;
                    }
                }
            }
        }
    });

})