require(['vue', 'Zepto','req', 'loading', 'Util', 'message', 'Store'], function (Vue, $, Req, Loading, Util, Msg, Store) {
    var Comment = new Vue({
        el: '#j_comment',
        data: {
            kitchen: '',
            rating: 0,
            content: ''
        },
        created: function(){
            this.kitchen = Store.get('Kitchen');
        },
        methods: {
            //点击完成按钮
            confirm: function(){
                var dish = Store.get('ToCommentDish'),
                    dishId = dish && dish.dishId;

                if(!dishId){
                    Msg.showMessage('出错了');
                    setTimeout(function(){
                        history.back(-1);
                    }, 2000);
                    return;
                }
                if(!this.content || this.content.length == 0){
                    Msg.showMessage('请给阿姨留句话吧');
                    return;
                }
                Loading.showLoading();
                Req.execute('dishComment', {orderDishId: dishId, rating: this.rating, content: this.content}, function(data){
                    Loading.hideLoading();
                    Msg.showMessage('评论成功');
                    setTimeout(function(){
                        history.back(-1);
                    }, 2000);
                }, function(){
                    Loading.hideLoading();
                    Msg.showMessage('网络开小差了,请稍后再试');
                }, this);
            },
            chooseStar: function(e){
                var $target = $(e.currentTarget);
                if($target.hasClass('current')){
                    this.rating = $target.index();
                }else{
                    this.rating = $target.index() + 1;
                }
            }
        }
    });
});