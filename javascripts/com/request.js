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
            reqLocation: 'unsecure/buildings'
        },
        /*检测网络环境*/
        getEnviroment: function () {
            if(location.host.indexOf('localhost') > -1){
                return 'dev';
            }else{
                return 'prd';
            }
        },
        /*获取请求的完整url*/
        getReqURL: function (reqName) {
            var url = '';
            url = this.reqHost[this.getEnviroment()];

            url += '/' + this.reqHash[reqName];

            return url;
        }
    };
    return req;
})