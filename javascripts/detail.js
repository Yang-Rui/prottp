//做路由切换时需要改为define
require(['vue', 'Zepto','req', 'loading', 'Util'], function (Vue, $, Req, Loading, Util) {
    var Detail = new Vue({
        el: '#j_detail',
        data: {
            kitchen: {
                displayName: '',
                origin: '',
                photos: [
                ],
                sales: 0,
                rating: 0,
                specialities: '',
                description: '',
                comments: 0
            },
            comments: {
                cmts: [{
                    userName: '',
                    userPhoto: '',
                    rating: 0,
                    content: '',
                    createTime: ''
                }]
            },
            style: {
                carousel: {
                    img: {
                        width: '0px'
                    },
                    allwidth: {
                        width: '0px'
                    },
                    wrapper: {
                        width: '0px'
                    },
                }
            }
        },
        created: function () {
            var kitchenId = Util.getQueryParam('kid') || 11,
                    page = 1;
                    numberPerPage = 20;
                Loading.showLoading();
                Req.execute('reqKitchenInfo', {kitchenId: kitchenId}, function(data){
                    Loading.hideLoading();
                     data.rating = Math.floor(data.rating);
                    this.kitchen = data;
                    this._carousel(5);
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
        },
        methods: {
            _carousel: function (pNum) {
                var dWidth = $(document).width();
                this.style.carousel.img.width = dWidth + 'px';
                this.style.carousel.allwidth.width = dWidth*pNum + 'px';
                this.style.carousel.wrapper.width = dWidth*(pNum-1 < 0 ? 0 : pNum-1) + 'px';
            }
        }
    });
});
