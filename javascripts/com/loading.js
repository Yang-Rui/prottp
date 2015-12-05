define([''], function () {
    /**
    * @descrption: loading组件
    * @version: 1.0.0
    * @author: mfoonirlee
    */
    var Loading = {
        //全屏loading的单体实例
        _instance: null,
        /*
        * @descrption: 显示一个全屏的loading
        * @param: msg{string} 默认为加载中...
        * @param: timeout{string} 默认不会隐藏
        */
        showLoading: function(msg, timeout){
            msg = msg || '加载中...';
            var d = document.createElement('div');
            d.className = 'mask';
            d.style.zIndex = '1000';
            d.innerHTML = "<div class='center'><p class='loading'></p><p class='loading-word' fz-14>" + msg + "</p></div>";
            document.body.appendChild(d);
            document.body.style.overflow = 'hidden';
            this._instance = d;

            if(timeout){
                setTimeout(function(){
                    document.body.removeChild(d);
                    document.body.style.overflow = 'auto';
                }, timeout);
            }
        },
        /*
        * @descrption: 隐藏全屏的loading
        */
        hideLoading: function(){
            if(this._instance){
                document.body.removeChild(this._instance);
                document.body.style.overflow = 'auto';
            }
        }
        /**
        * @descrption: 显示一个局部的loading
        * @param: container{documentElement} 必传项 将loading加入某个容器
        * @param: msg{string} 默认为加载中...
        */
    };
    return Loading;
});