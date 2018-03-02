var eventCompatible = {
    // 添加事件处理程序的方法
    getEvent: function(element, type ,handler){
        if(!element){ return false };
        if(element.addEventListener){
            element.addEventListener( type, handler, false);
            return true;
        }
        if(element.attachEvent){
            element['e' + type + handler] = handler;
            element[ type + handler] = function(){
                element['e' + type + handler](window.event);
            }

            element.attachEvent( 'on' + type , element[ type + handler]);
            return true;
        }
        return false;
    },

    // 删除事件处理程序的方法
    removeEvent: function(element, type, handler){
        if(!element){ return false; }
        if(element.removeEventListener){
            element.removeEventListener( type, handler, false);
            return true;
        }
        if(element.detachEvent){
            element.detachEvent('on' + type + element[type + handler]);
            element[type + handler] = null;
        }
    },

    // 获取事件对象
    getEvent: function(e){
        return e || window.event;
    },

    // 获取目标事件
    getTarget: function(e){
        return e.target || e.srcElement;
    }, 

    // 取消默认事件
    preventDefault: function(e){
        if(e.preventDefault){
            e.preventDefault();
        }else{
            e.returnValue = false;
        }
    },

    // 取消事件冒泡
    stopPropagation: function(e){
        if(e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }
    },
};
