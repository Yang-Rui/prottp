define(['Zepto', 'Store'], function ($, Store) {

    //定义所有的请求链接
    var req = {
        //需要对应这几个值
        reqHost: {
            dev: 'http://localhost:8088',
            prd: 'http://linjiameishi.cn'
        },
        //rreqName即请求名，在这里维护
        reqHash: {
            //获取验证码
            reqICode: ['GET', 'auth/verificationCode/{mobile}'],
            //验证码登录
            reqICodeLogin: ['POST', 'auth/loginByCode'],
            //获取我的信息
            reqMyInfo: ['GET', 'api/user/me'],
            //查询位置
            reqLocation: ['GET', 'unsecure/buildings'],
            //请求菜单
            reqMenu: ['GET', 'unsecure/menu/{buildingId}/{date}'],
            //厨房信息
            reqKitchenInfo: ['GET', 'unsecure/kitchen/{kitchenId}'],
            //厨房评论
            reqComments: ['GET', 'unsecure/kitchen/{kitchenId}/commentList'],
            //生成订单
            placeOrder: ['POST', 'api/order/new'],
            //订单详情
            orderDetail: ['GET', 'api/order/{orderId}'],
            //评论
            dishComment: ['POST', 'api/order/orderDish/{orderDishId}/comment'],
            //订单列表
            orderList: ['GET', 'api/order/me']
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
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                content: self,
                data: _self.reqHash[reqName][0] == 'POST' ? JSON.stringify(params) : null,
                beforeSend: function (request) {
                    Store.get('token') && request.setRequestHeader('Authorization', Store.get('token'));
                },
                success: function (data) {
                    console.log(reqName + '请求成功');
                    success && typeof success == 'function' && success.call(scope, data);
                },
                error: function (data) {
                    //错误状态下返回的是整个xmlhttpreq,需要手动提取response
                    console.log(reqName + '请求失败');
                    try{
                        //返回的可能是一段HTML不能被json化
                        data = data && data.response && JSON.parse(data.response);
                    }catch(e){
                        data = {};
                    }
                    error && typeof error == 'function' && error.call(scope, data);
                },
            });
        },
        /*检测网络环境*/
        getEnvironment: function () {
            // return 'prd';
            if(location.host.indexOf('localhost') > -1 || location.host.indexOf('file') > -1){
                return 'dev';
            }else{
                return 'prd';
            }
        },
        /*获取请求的完整url*/
        getReqURL: function (reqName, params) {
            var url = '';
            url = this.reqHost[this.getEnvironment()];
            // url = 'http://localhost:8088';
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