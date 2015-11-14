//做路由切换时需要改为define
require(['vue', 'Zepto', 'Carousel','req'], function (Vue, $, Carousel, Req) {
    var Detail = new Vue({
        el: '#j_detail',
        data: {
            kitchen: {
                displayName: '抓一小处',
                origin: '四川成都',
                photos: [
                    'a','b','c','d'
                ],
                sales: 4,
                rating: 4,
                specialities: 'TEST TEST',
                description: 'ABST sadgye eufihaf aoihaiuf aiuhafa fa.afiasfhui fs. ffas fhuh fu ahf yug ayfu gafl mdjkcai',
                comments: 100
            },
            comments: {
                cmts: [{
                    userName: 'hehehe',
                    userPhoto: 'hfshfiua',
                    rating: 2,
                    content: '很好很好很好很好很好很好 很好',
                    createTime: '2015/11/06 12:33:00'
                }, {
                    userName: 'hehehe',
                    userPhoto: 'hfshfiua',
                    rating: 2,
                    content: '很好很好很好很好很好很好 很好',
                    createTime: '2015/11/06 12:33:00'
                }]
            }
        },
        methods: {
            onshow: function () {
                var kitchenId = 11,
                    page = 1;
                    numberPerPage = 20;
                Req.execute('reqKitchenInfo', {kitchenId: kitchenId}, function(data){
                     data.rating = Math.floor(data.rating);
                    this.kitchen = data;
                }, function(data){
                    //todo
                }, this);

                Req.execute('reqComments', {kitchenId: kitchenId, page: page, numberPerPage: numberPerPage}, function(data){
                    this.comments.cmts = data && data.list;
                    //  data.rating = Math.floor(data.rating);
                    //  console.log(data.rating);
                    // this.kitchen = data;
                }, function(data){
                    //todo
                }, this);
            }
        }
    })
});
