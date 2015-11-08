//做路由切换时需要改为define
require(['vue', 'Zepto', 'Carousel'], function (Vue, $, Carousel) {
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

        }
    })
});
