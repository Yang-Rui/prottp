define([''], function () {
    /**
    * @descrption: message组件,用于各种弹窗消息
    * @version: 1.0.0
    * @author: mfoonirlee
    */
    var Message = {
        //全屏Message的单体实例
        _instance: null,
        /*
        * @descrption: 显示一个全屏的Message
        * @param: msg{string} 没有则不会弹窗
        * @param: timeout{string} 默认2s隐藏
        */
        showMessage: function(msg, timeout){
            if(!msg){
                throw new Error('弹出消息失败,请传入需要弹出的消息')
                return;
            }
            var d = document.createElement('div');
            d.className = 'mask';
            d.style.zIndex = '1000';
            d.innerHTML = "<div class='center center-msg'><p class='message-word top-in opacity' fz-14>" + msg + "</p></div>";
            document.body.appendChild(d);
            document.body.style.overflow = 'hidden';
            this._instance = d;

            timeout = timeout || 2000;
            if(timeout){
                setTimeout(function(){
                    document.body.removeChild(d);
                    document.body.style.overflow = 'auto';
                }, timeout);
            }
        },
        /*
        * @descrption: 隐藏全屏的Message
        */
        hideMessage: function(){
            if(this._instance){
                document.body.removeChild(this._instance);
                document.body.style.overflow = 'auto';
            }
        }
    };
    return Message;
});