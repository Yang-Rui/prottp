define(['Zepto'], function ($) {

    //定义所有的请求链接
    var req = {
        //需要对应这几个值
        reqHost: {
            dev: 'http://localhost:8088',
            prd: ''
        },
        //rreqName即请求名，在这里维护
        reqHash: {
            //查询位置
            reqLocation: ['GET', 'unsecure/buildings'],
            //请求菜单
            reqMenu: ['GET', 'unsecure/menu/{buildingId}/{date}'],
            //厨房信息
            reqKitchenInfo: ['GET', 'unsecure/kitchen/{kitchenId}'],
            //厨房评论
            reqComments: ['GET', 'unsecure/kitchen/{kitchenId}/commentList'],
            //微信支付
            wxPayNotify: ['POST', 'unsecure/weixin/pay/notify']
        },
        /*
            发送网络请求
            @param object {key: value}
            @success function
            @error function
        */
        execute: function (reqName, params, success, error, scope) {
            var _self = this,
                reqUrl = this.getReqURL(reqName, params);

            if (!reqUrl) {
                return;
            }

            $.ajax({
                type: _self.reqHash[reqName][0],
                url: reqUrl,
                dataType: 'json',
                content: self,
                data: _self.reqHash[reqName][0] == 'POST' ? params : {},
                success: function (data) {
                    console.log(reqName + '请求成功');
                    success && typeof success == 'function' && success.call(scope, data);
                },
                error: function (data) {
                    console.log(reqName + '请求失败');
                    error && typeof error == 'function' && error.call(scope, data);
                },
            });
        },
        /*检测网络环境*/
        getEnvironment: function () {
            if(location.host.indexOf('localhost') > -1){
                return 'dev';
            }else{
                return 'prd';
            }
        },
        /*获取请求的完整url*/
        getReqURL: function (reqName, params) {
            var url = '';
            // url = this.reqHost[this.getEnvironment()];
            url = 'http://localhost:8088';
            //如果找不到配置报错
            if (!this.reqHash[reqName]) {
                console.error('No url configured found.');
                return;
            }

            url += '/' + this.reqHash[reqName][1];
            //GET 请求拼写url
            if (this.reqHash[reqName][0] == 'GET') {
                for (key in params) {
                    if (url.indexOf('{' + key + '}') > -1) {
                        url = url.replace('{' + key + '}', params[key]);
                    } else {
                        url += ((url.indexOf('?') > -1 ? '&' : '?') + key + '=' + params[key]);
                    }
                }
            }
            return url;
        }
    };
    return req;
})